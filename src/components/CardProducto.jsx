import Button from "./Button";
import {Card, CardContent, CardMedia} from "@mui/material";
function CardProduct(props) {
    const { price, title, text, img } = props;

    const addCart=()=> {

    }



    return (
        <Card className="w-1/3 shadow-black m-3 ">
            <CardMedia image={img} className="h-32 w-32" />
            <CardContent>
                <h3 className="card-title">{title}</h3>
                <p className="card-text">{text}</p>
                <div>
                    <p className="card-price">$ {price}</p>
                </div>
                <Button text="Agregar al carrito" color="#4a6064" onClick={addCart} />
            </CardContent>
        </Card>
    );
}

export default CardProduct;