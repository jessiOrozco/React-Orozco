import Item from './Item';


function ItemList(props){
    return (
        <div>
            <h2 className="my-2 font-bold text-emerald-800 text-center text-4xl ">{props.greetings}</h2>
            <div className="grid grid-cols-3 gap-2.5">
                {props.products.map(product => (
                    <Item key={product.id} {...product} />
                ))}
            </div>
        </div>
    )
}

export default ItemList;