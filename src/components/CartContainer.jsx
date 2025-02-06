import React, {useContext, useState} from "react";
import cartContext from "../context/cartContext.jsx";
import {createBuyOrder} from "../data/database.js";
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

function CartContainer() {
    const [userData, setUserData] = useState({
        username: "",
        surname: "",
        age: ""
    })
    const [open, setOpen] = React.useState(false);
    const [orderID, setOrderID] = React.useState("");
    function onInputChange(event) {
        const inputName = event.target.name;
        const newUserData = {...userData};
        newUserData[inputName] = event.target.value;
        setUserData(newUserData);
    }

    const {cartItems, removeItem, getTotalPrice} = useContext(cartContext);
    async function handleCheckout(event) {
        event.preventDefault();

        const orderData = {
            buyer: {
                username: userData.username,
                surname: userData.surname,
                age: userData.age,
            },
            items: cartItems,
            total: getTotalPrice(),
            date: new Date().getTime(),
        };
        setOrderID(await createBuyOrder(orderData));
        onOpen();
    }
    const handleClose = () => {
        setOpen(false)
    }
    const onOpen = () => {
        setOpen(true)
    }
    return (
        <>
        <div className="flex flex-col w-auto mx-32">
            <h1 className="text-center mt-3 text-emerald-800 text-4xl font-bold">Tu carrito</h1>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <div className="border-4 w-1/2 mt-5 p-5 border-gray-600  flex flex-col">
                        <h3 className="text-2xl font-bold text-center">{item.title}</h3>
                        <p className="font-bold ">$ {item.price}</p>
                        <p className="font-bold ">cantidad: {item.count}</p>
                        <button className="bg-red-400 rounded w-1/3 self-center justify-self-center" onClick={() =>removeItem(item.id) }> Eliminar</button>
                    </div>
                    <hr/>
                </div>
            ))}
            <form className="flex flex-col align-middle justify-center" >
                <div className="flex flex-col align-items-center my-5">
                    <label>Nombre</label>
                    <input className="py-2 px-2  border border-amber-300" type="text" name="username" onChange={onInputChange} />
                </div>
                <div className="flex flex-col align-items-center my-5">
                    <label>Apellido</label>
                    <input className="py-2 px-2  border border-amber-300" type="text" name="surname" onChange={onInputChange} />
                </div>
                <div className="flex flex-col align-items-center my-5">
                    <label>Edad</label>
                    <input className="py-2 px-2 border border-amber-300" type="text" name="age" onChange={onInputChange} />
                </div>
            </form>
            <div className="flex justify-center my-5">
                <button
                    disabled={
                        !(
                            userData.username !== "" &&
                            userData.surname !== "" &&
                            userData.age !== ""
                        )
                    }
                    onClick={handleCheckout}
                    className="p-5 w-1/3 rounded-xl bg-gray-600 text-emerald-400"
                >
                    Realizar compra
                </button>
            </div>

        </div>
            <Dialog open={open}
                onClose={handleClose}>
                <DialogTitle id="alert-dialog-title" >{userData.username} Tu pedido ha sido registrado</DialogTitle>
                <DialogContent className="flex flex-col align-center">
                    <DialogContentText id="alert-dialog-description">
                        Su Pedido <span className="text-emerald-800">{orderID}</span> sera revisado y se mandara cuando se tenga disponibilidad de este
                    </DialogContentText>
                    <button className="p-4 self-center w-1/2 bg-emerald-400 text-center text-gray-700" onClick={handleClose}>Aceptar</button>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default CartContainer;