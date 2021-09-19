const CATEGORIES_URL = "https://theo-lembo.github.io/json/category/categories.json";
const CATEGORY_INFO_URL = "https://theo-lembo.github.io/json/category/catInfo.json";
const PUBLISH_PRODUCT_URL = "https://theo-lembo.github.io/json/product/publishProd.json";
const PRODUCTS_URL = "https://theo-lembo.github.io/json/product/prods.json";
const PRODUCT_INFO_URL = "https://theo-lembo.github.io/json/product/prodsInfo.json";
const PRODUCT_INFO_COMMENTS_URL = "https://theo-lembo.github.io/json/product/prodsComments.json";
const CART_INFO_URL = "https://theo-lembo.github.io/json/cart/cartInfo.json";
const CART_BUY_URL = "https://theo-lembo.github.io/json/cart/buyMsg.json";

var showSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function() {
    document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url) {
    var result = {};
    showSpinner();
    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        })
        .then(function(response) {
            result.status = 'ok';
            result.data = response;
            hideSpinner();
            return result;
        })
        .catch(function(error) {
            result.status = 'error';
            result.data = error;
            hideSpinner();
            return result;
        });
}

function returnUser() {
    let user = localStorage.getItem("user");
    //console.log(user);
    if (user != undefined && user != "") {
        return user
    }
    location.href = "index.html"
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    let icon = `<link rel="icon" type="image/png" href="img/faviconD.png" />`;
    document.head.innerHTML += icon;
    let navBar = "";
    navBar = `
        <div class="container d-flex flex-column flex-md-row justify-content-between">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link d-md-inline-block " href="inicio.html">Inicio</a>
                        </li>      
                        <li class="nav-item active">
                            <a class="nav-link" href="categories.html">Categorías</a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="products.html">Productos
                            </a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" href="sell.html">Vender</a>
                        </li>
                        <li class="nav-item dropdown">
                            
                            <a class="nav-link dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ` + returnUser() + `</a>

                            <div class="dropdown-menu" aria-labelledby="navbarDropdown"> 
                                <button class="dropdown-item" id="buttonCustom" onclick="shopCart()">Mi carrito</button>
                                <button class="dropdown-item" id="buttonCustom" onclick="logOut()">Cerrar sesión</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>`;
    document.getElementById("navBar").innerHTML = navBar;
});

function shopCart() {
    location.href = "cart.html";
}

//Logout function
function logOut() {
    document.cookie = "username=" + returnUser() + "; expires=Thu, 18 Dec 2020 12:00:00 UTC; path=/";
    localStorage.removeItem("user");
    location.href = "index.html";
}