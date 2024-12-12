import {Icon} from "react-icons-kit";
import {cart} from 'react-icons-kit/icomoon/cart'

function CardWidget(){
    const numeroProductos = 10;
    return(
        <div>
            <Icon icon={cart}/>
            <sup>{numeroProductos}</sup>
        </div>
    )
}

export default CardWidget;