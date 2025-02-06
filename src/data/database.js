import {initializeApp} from "firebase/app";
import {
    addDoc,
    collection,
    doc,
    documentId,
    getDoc,
    getDocs,
    getFirestore,
    query,
    where,
    writeBatch
} from "firebase/firestore";
import products from "./data"

const firebaseConfig = {
    apiKey: "AIzaSyCEvi8S0c3_pHoxJ9ih6DjQqjZYH8y1lzQ",
    authDomain: "react-ecommerse-ee24a.firebaseapp.com",
    projectId: "react-ecommerse-ee24a",
    storageBucket: "react-ecommerse-ee24a.firebasestorage.app",
    messagingSenderId: "823166679847",
    appId: "1:823166679847:web:5ec41db7767426324b8702"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default async function getAsyncData(){
    const collectionRef = collection(db,"products");
    const productsSnapshot = await getDocs(collectionRef);

    return productsSnapshot.docs.map((doc) => {
        const fullData = doc.data();
        fullData.id = doc.id;
        return fullData;
    });
};

export async function getAsyncItemById(itemID) {
    const docRef = doc(db, "products",itemID )
    const docSnapshot = await getDoc(docRef);
    return docSnapshot.data();
}

export async function getAsyncItemsByCategory(catID) {
    const productsColRef = collection(db, "products");
    const q = query(productsColRef, where("category", "==", catID))

    const productsSnapshot = await getDocs(q) // snapshot de datos
    // snapshot -> docs


    return productsSnapshot.docs.map(doc => {
            const fullData = doc.data()
            fullData.id = doc.id;
            return fullData;
        }
    );

}

export async function exportProductsToDB(){
    for(let item of products){
        delete item.id;
        await addDoc( collection(db, "products"), item);
    }
}

export async function exportProductsWithBatch(){
    const batch = writeBatch(db)

    products.forEach( item => {
        const itemid = `${item.id}`;
        delete item.id
        const newDoc = doc(db, "products", `item-${itemid}`);
        batch.set(newDoc, item)
    });

    const commitRes = await batch.commit()
}

export async function createBuyOrder(orderData){
    const newOrderDoc =
        await addDoc(collection(db, "orders"), orderData);

    return newOrderDoc.id
}

// TODO : SIN TESTEAR
export async function createBuyOrderWithStockUpdate(order){
    // Necesitamos acceder a los documentos de las colecciones "orders" como también "products"
    const orderRef = collection(db, "order");
    const productsRef = collection(db, "products");

    //* 1. Creamos un nuevo lote de escritura ("writeBatch")
    const batch = writeBatch(db);

    //* 2. Actualizar cada item según la compra del usuario ("stock" menos "count")

    //* 2-A hago un listado de los items a actualizar
    const arrayIds = order.items.map((item) => item.id);


    //* 2-B obtengo de Firestore los datos de los productos a actualizar utilizando una query
    // la "query" filtra los productos donde: el id del documento (documentId()) esté incluido (in) el array creado (arrayIds)
    // "documentId()" es un helper de la librería de firestore que permite especificar el "id" de los documentos en una query
    // "in" es un operador de comparación que sirve para buscar un campo dentro de un array de posibles valores
    const q = query(productsRef, where(documentId(), "in", arrayIds));
    const querySnaphot = await getDocs(q);
    const docsToUpdate = querySnaphot.docs;

    // creamos un array donde almacenar todos los productos que no tengan stock
    let itemsSinStock = [];

    //* . Por cada documento que se necesite actualizar, comprobamos si hay stock suficiente para la compra
    docsToUpdate.forEach((doc) => {
        //* 3.A Obtengo el stock guardado según la base de datos
        let { stock } = doc.data();

        //* 3.B Encontramos el item "iterado" en el carrito de compras que creó el usuario
        let itemInCart = order.items.find((item) => item.id === doc.id);
        let countInCart = itemInCart.count;

        //* 3.C Calculamos la cantidad resultante si se efectuara la compra
        let newStock = stock - countInCart;

        //* 4. Validamos ->  ¿Hay stock suficiente?
        if (newStock < 0) {
            // si es así, sumamos el item al array de "items sin stock"
            itemsSinStock.push(doc.id);
        }
        else {
            // sino, agregamos una operación de "update" al "batch" de escritura
            // en batch.update modificamos en el documento el valor de "stock" de dicho item
            batch.update(doc.ref, { stock: newStock });
        }
    });

    //* 5. Si "items sin stock" tiene al menos una entrada -> generamos un error, deteniendo la ejecución del script

    // creamos un string mostrando todos los "titles" de los items sin unidades disponibles
    const itemsSinStockString = itemsSinStock.map( item => item.title ).join(", ");

    if (itemsSinStock.length >= 1){
        throw new Error(`Stock no disponible para los productos ${itemsSinStockString}`);
    }
    // LLegado este punto, podemos estar seguros que todos los productos cuentan con stock suficiente
    else {
        //* 6.  hacemos el "commit" del batch  actualizando todos los documentos y creamos la orden de compra
        await batch.commit();

        //* 7. Generamos la orden de compra
        let newOrder = await addDoc(orderRef, order);
        return newOrder.id;
    }
}

export async function updateStock(){

}