import CartWidget from "./CartWidget";
import {Link} from "react-router-dom";

function Navbar() {
    return (
        <header className="bg-gray-300 w-full m-0">
            <nav className="flex flex-row w-full h-16 justify-around items-center"
                 aria-label="main navigation">

                <Link className="m-1.5 p-1.5" to="/">
                    <img className="h-14 w-auto" src="/src/assets/logoEcommerce.png" alt="Logo"/>
                </Link>
                <h2 className="text-xl">Ropa Alucinante</h2>
                <Link className="text-emerald-800" to="/categoria/playeras">Playeras</Link>
                <Link className="text-emerald-800" to="/categoria/pantalones">Pantalones</Link>
                <Link className="text-emerald-800" to="/categoria/gorras">Gorras</Link>
                    <CartWidget></CartWidget>
            </nav>

        </header>
    )
}

export default Navbar;