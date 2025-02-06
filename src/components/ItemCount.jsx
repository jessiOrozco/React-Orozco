import { useState } from "react";

function ItemCount(props) {
    let [count, setCount] = useState(1);

    const handleAdd = () => {
        if (count === props.max) return;
        setCount(count + 1);
    };

    const handleSubstract = () => {
        // TODO: Antes de modificar el estado -> VALIDAR que no descienda de un min (1)
        if (count <= 1){
            return
        }
        setCount(count - 1);
    };

    function handleClick() {
        props.onSubmitCount(count);
    }

    return (
        <div>
            <div className="flex flex-row justify-center gap-2.5 items-center">
                <button className="p-4 bg-gray-300 rounded-lg" onClick={handleAdd}>+</button>
                <span>{count}</span>
                <button className="p-4 bg-gray-300 rounded-lg" onClick={handleSubstract}>-</button>
            </div>
            <div className="mt-4">
                <button className="p-4 bg-emerald-400 rounded-lg" onClick={handleClick}>Agregar al carrito</button>
            </div>
        </div>
    );
}

export default ItemCount;
