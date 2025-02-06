import {createContext, useState} from "react";

const cartContext = createContext({cartItems: []});

export function CartContextProvider(props) {
    const [cartItems, setCartItems] = useState([]);
    function getTotalPrice() {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.count * item.price;
        });
        return total;
    }

    function removeItem(id) {
        const newCartState = cartItems.filter((item) => item.id !== id);
        setCartItems(newCartState);
    }

    function addItem({price, id, title, img, count}) {
        const copyCartItems = [...cartItems];
        copyCartItems.push({
            id: id,
            title: title,
            count: count,
            price: price,
            img: img,
        });

        setCartItems(copyCartItems);
    }

    function countItemsInCart() {
        let total = 0;
        cartItems.forEach((item) => {
            total += item.count;
        })
        return total;
    }

    return (
        <cartContext.Provider
        value={{
            cartItems,
            countItemsInCart,
            addItem,
            removeItem,
            getTotalPrice,
        }}
        >
            {props.children}
        </cartContext.Provider>
    )
}
export default cartContext;