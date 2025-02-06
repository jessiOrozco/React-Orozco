import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getAsyncItemById} from "../data/database.js";
import ItemDetail from "./ItemDetail.jsx";
import Loader from "./Loader.jsx";

function ItemDetailContainer(){
    const [product, setProduct] = useState(null)
    const { id} = useParams();

    useEffect(() => {
        async function getProduct() {
            const data = await getAsyncItemById(id);
            setProduct(data);
        }
        getProduct();
    }, [id]);
    if (product) return <ItemDetail {...product} id={id}/>;
    else return <Loader/>
}

export default ItemDetailContainer;