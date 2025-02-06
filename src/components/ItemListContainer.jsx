import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import getAsyncData, {getAsyncItemsByCategory} from "../data/database.js";
import ItemList from "./ItemList.jsx";


function ItemListContainer(props) {
    const [products, setProducts] = useState([]);
    const {catId} = useParams();

    useEffect(() => {
        if (!catId) {
            const respuestaPromise = getAsyncData();
            respuestaPromise
                .then((respuesta) => setProducts(respuesta))
                .catch((err) => alert(err));
        }else{
            const respuestaPromise = getAsyncItemsByCategory(catId);
            respuestaPromise
                .then((respuesta) => setProducts(respuesta))
                .catch((err) => alert(err));
        }
    }, [catId]);

    return (
        <div>
            <ItemList greetings={props.greetings} products={products}/>
        </div>
    )
}


export default ItemListContainer;