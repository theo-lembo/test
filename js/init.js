const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

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
            <a class="py-2 d-none d-md-inline-block" href="inicio.html">Inicio</a>
            <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
            <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
            <a class="py-2 d-none d-md-inline-block" href="sell.html">Vender</a>
            <a class="py-2 d-none d-md-inline-block" href="cart.html">Mi carrito</a>
            <div class="dropdown show">
                <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ` + returnUser() + `</a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <button class="py-2 d-none d-md-inline-block" id="buttonCustom" onclick="tryA()">LogOut</button>
                </div>
            </div>
        </div>`;
    document.getElementById("navBar").innerHTML = navBar;
});

//Logout function
function tryA() {
    localStorage.removeItem("user");
    location.href = "index.html";
}

/*const tryA = async() => {
    const response = await fetch('https://oauth2.googleapis.com/revoke?token=');
    const myJson = await response.json();
    
}*/