import "./App.css";
import Navbar from "./components/Navbar.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ItemDetailContainer from "./components/ItemDetailContainer.jsx";
import CartContainer from "./components/CartContainer.jsx";
import {CartContextProvider} from "./context/cartContext.jsx";
import {exportProductsToDB} from "./data/database.js";

function App() {

  return (
      <CartContextProvider>
          <BrowserRouter>
              <Navbar/>
              {/*<button className="my-5" onClick={exportProductsToDB}>*/}
              {/*    exportar datos*/}
              {/*</button>*/}
                  <Routes>
                      <Route path="/" element={<ItemListContainer greetings="Toda la ropa"/>}/>
                      <Route path="/categoria/:catId" element={<ItemListContainer greetings="Compra por categoría "/>}/>

                      <Route path="/item/:id" element={<ItemDetailContainer/>}/>
                      <Route path="/cart" element={<CartContainer/>}/>
                  </Routes>
          </BrowserRouter>
      </CartContextProvider>
  )
}

export default App
