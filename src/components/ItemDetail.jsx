import {useContext, useState} from "react";
import CartContext from "../context/cartContext.jsx";
import ItemCount from "./ItemCount.jsx";
import {Link} from "react-router-dom";

function ItemDetail(props){
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const {price, title, img, stock, id} = props;
    const {addItem} = useContext(CartContext);
    function onSubmitCount(count){
        addItem({id,price,title,count,img});
        setIsAddedToCart(true);
    }

    return (
        <div className="w-full mt-5 flex flex-col justify-center items-center align-middle">
            <img src={img} alt="product img" className="w-1/6 "/>
            <div>
                <h3 className="text-center text-emerald-800 font-bold text-xl">{title}</h3>
                <div className="text-center font-bold text-xl">
                    $ {price}
                </div>
            </div>
            <div>
                {isAddedToCart ? (
                    <Link to={`/cart`}>
                        <button className="bg-gray-600 text-emerald-500 p-4">Ver carrito</button>
                    </Link>

                ): (
                    <ItemCount onSubmitCount={onSubmitCount} max={stock} />
                )}
            </div>
        </div>
    );
}
export default ItemDetail;