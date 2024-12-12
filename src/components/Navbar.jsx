import CartWidget from "./CartWidget";

function Navbar() {
    return (
        <header className="bg-gray-300 w-full m-0">
            <nav className="flex flex-row w-full h-16 justify-around items-center"
                 aria-label="main navigation">
                <a href="#" className="-m-1.5 p-1.5">
                    <img className="h-14 w-auto" src="/src/assets/logoEcommerce.png" alt="Logo"/>
                </a>
                <h2>Ropa Alucinante</h2>
                <a href="#">Playeras</a>
                <a href="#">Pantalones</a>
                <a href="#">Gorras</a>
                <a href="#">
                    <CartWidget></CartWidget>
                </a>

            </nav>

        </header>
    )
}

export default Navbar;