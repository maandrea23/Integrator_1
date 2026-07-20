export default function Navbar() {
  return `
    <header class="navbar">
      <div class="logo">
         <span>Sun</span>wise
      </div>

      <nav class="nav-center">
        <a href="#/" id="btn-home" class="nav-btn active">Inicio</a>
        <a href="#/wizard" id="btn-wizard" class="nav-btn">Simular</a>
        <a href="#/marketplace" id="btn-marketplace" class="nav-btn">Marketplace</a>
        <a href="#/installers" id="btn-installers" class="nav-btn">Instaladores</a>
      </nav>

      <div class="nav-right">
        <a href="#/register" id="btn-register" class="btn-outline">Registrarse</a>
        <a href="#/contact" id="btn-contact" class="btn-primary">Contacto</a>
      </div>

      <div class="menu-hamburger">
        <span></span>
        <span></span>
        <span></span>
      </div>

    </header>
  `;
}


export function initNavbar() {

    // Botón Inicio
    const homeBtn = document.getElementById("btn-home");

    if(homeBtn){

        homeBtn.addEventListener("click",(e)=>{

            e.preventDefault();

            window.location.hash="/";

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        });

    }

    // Menú hamburguesa
    const menu = document.querySelector(".menu-hamburger");
    const nav = document.querySelector(".nav-center");

    if(menu && nav){

        menu.addEventListener("click",()=>{

            nav.classList.toggle("show");

        });

    }

}
