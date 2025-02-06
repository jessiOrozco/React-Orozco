import {Icon} from "react-icons-kit";
import {cart} from 'react-icons-kit/icomoon/cart'
import {useContext} from "react";
import cartContext from "../context/cartContext.jsx";
import {Link} from "react-router-dom";

function CardWidget(){
    const context = useContext(cartContext);

    return(
        <button>
            <Link to={`/cart`}>
                <Icon className="text-emerald-800" icon={cart}/>
                <sup className="text-emerald-500">{context.countItemsInCart()}</sup>
            </Link>

        </button>
    )
}

export default CardWidget;