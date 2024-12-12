import codersvg from "./assets/ch.svg";
import "./App.css";
import Button from "./components/Button";
import CardProduct from "./components/CardProducto.jsx";
import FlexContainer from "./components/FlexContainer";
import Navbar from "./components/Navbar.jsx";
import ItemListContainer from "./components/ItemListContainer.jsx";

function App() {
     const titulo = "Clase 3 - JSX";
     const userFavoriteColor = "rgb(255,50.80)";
     function userGreeting(name){
         const saludo = `Bienvenido ${name} a mi app`;
         return saludo;
     }

     function isUserloggedIn(){
         return false;
     }

     function login(){
         alert("Bienvenido!");
     }

  return (
      <>
          <Navbar></Navbar>
          <ItemListContainer greeting="Miguel"></ItemListContainer>
          <section style={{display: "none"}}>
              <h1> {titulo} </h1>
              <img src={codersvg} alt="Coder logo"/>
              <div className="card">
                  <p>{userGreeting("Jessi")}</p>
              </div>

              <p className="read-the-docs">Hola react ya instalé Vite!</p>

              <button
                  onClick={login}
                  disabled={isUserloggedIn()}
                  className="best-button-ever"
                  style={{
                      backgroundColor: userFavoriteColor,
                      color: "white",
                      textTransform: "uppercase",
                      padding: "15px",
                  }}
              >
                  Comprar
              </button>
          </section>

          <section>
              <h2>Tienda de playeras</h2>
              <Button text="Iniciar sesión"/>
              <Button text="Registro" disabled={true}/>
              <Button text="Hola coder!" color="purple"/>
          </section>

          <section>
              <FlexContainer>
                  {/* ACA VAN LOS CHILDREN */}
                  <CardProduct
                      price={25.5}
                      title="Remera Coder"
                      text="Best remera!"
                      img="/images/javascript.bmp"
                  />
                  <CardProduct
                      price={15.5}
                      title="Gorra React"
                      text="Best gorra!"
                      img="/images/javascript.bmp"
                  />
                  <CardProduct
                      price={35.5}
                      title="Campera Javascript"
                      text="Best campera!"
                      img="/images/javascript.bmp"
                  />
              </FlexContainer>
          </section>
      </>
  )
}

export default App
