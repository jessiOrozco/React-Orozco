import {Card, CardActions, CardContent, CardMedia} from "@mui/material";
import {Link} from "react-router-dom";

function Item(props) {
    const {price, title, img, id} = props;


    return (
        <div className="mx-4 my-2">
            <Card className="shadow-xl ">
                <CardMedia className="flex justify-center">
                    <div className="flex justify-center ">
                        <img src={img} className="self-center h-32 w-32" alt="product-img"/>
                    </div>

                </CardMedia>
                <CardContent>
                    <div className="bg-gray-600 px-4 text-center">
                        <h1 className="text-2xl  text-emerald-500">{title}</h1>
                    </div>
                    <div className=" px-4 text-center">
                        <p className="font-bold text-lg">$ {price}</p>
                    </div>
                </CardContent>
                <CardActions className="px-4 text-center flex justify-center">
                    <Link to={`/item/${id}`}>
                        <button className="py-3 px-5 shadow-xl bg-gray-600 text-emerald-500">Ver detalle</button>
                    </Link>
                </CardActions>
            </Card>
        </div>
    )
}
export default Item;