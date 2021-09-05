var arrayProds = [];
var verificador = 1;
//Order variables
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_PRICE = "Precio.";
var currentSortCriteria = undefined;
var minPrice = undefined;
var maxPrice = undefined;

function customButton() {
    document.getElementById("vista").innerHTML = `
    <a id="buttonCustom" href="javascript:viewButton();">Vista</a>` +
        `<h2>Productos</h2>` +
        `<p class="lead">Verás aquí todos los productos del sitio.</p>`;
}

function showProductsCard() {
    verificador = 1;
    let htmlContentToAppend = "";
    for (let i = 0; i < arrayProds.length; i++) {
        let producto = arrayProds[i];
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(producto.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(producto.cost) <= maxPrice))) {
            htmlContentToAppend += `
                <div class="column"> 
                    <div class="card list-group-item-action">
                        <img src=` + producto.imgSrc + ` alt=` + producto.name + `>
                        <div class="container">
                            <h5><b>` + producto.name + `</b></h5>
                            <h5><b>` + " " + producto.currency + "  " + producto.cost + `</b></h5>
                            <p>` + producto.description + `</p>
                        </div>
                    </div>
                </div>
                `
        }
    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

function showProductsList() {
    verificador = 2;
    let htmlContentToAppend = "";
    for (let i = 0; i < arrayProds.length; i++) {
        let producto = arrayProds[i];
        if (((minPrice == undefined) || (minPrice != undefined && parseInt(producto.cost) >= minPrice)) &&
            ((maxPrice == undefined) || (maxPrice != undefined && parseInt(producto.cost) <= maxPrice))) {
            htmlContentToAppend += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                    <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4><b>` + producto.name + `</b></h4>
                            <h4><b>` + producto.currency + "  " + producto.cost + `</b></h4>
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                    </div>
                </div>
            </div>`
        }
    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

//Función para hacer el cambio de Lista a Cards, de paso uso el if raro (codicion ? res1 : res2) que ahorra yema de dedos.
function viewButton() {
    verificador == 1 ? showProductsList() : showProductsCard();
}

function sameView() {
    verificador == 1 ? showProductsCard() : showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        resultObj.status === "ok" ? sortAndShowProducts(ORDER_ASC_BY_NAME, resultObj.data) : console.log(resultObj.status);
        customButton();
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_PRICE);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minPrice = undefined;
        maxPrice = undefined;
        showProductsCard();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos.
        minPrice = document.getElementById("rangeFilterCountMin").value;
        maxPrice = document.getElementById("rangeFilterCountMax").value;

        if ((minPrice != undefined) && (minPrice != "") && (parseInt(minPrice)) >= 0) {
            minPrice = parseInt(minPrice);
        } else {
            minPrice = undefined;
        }

        if ((maxPrice != undefined) && (maxPrice != "") && (parseInt(maxPrice)) >= 0) {
            maxPrice = parseInt(maxPrice);
        } else {
            maxPrice = undefined;
        }
        showProductsCard();
    });
});;


/*------------------------------Filtros de busqueda-------------------------------*/

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function(a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_PRICE) {
        result = array.sort(function(a, b) {
            let aPrice = parseInt(a.cost);
            let bPrice = parseInt(b.cost);

            if (aPrice > bPrice) { return -1; }
            if (aPrice < bPrice) { return 1; }
            return 0;
        });
    }

    return result;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    productsArray != undefined ? arrayProds = productsArray : console.log("Error al obtener productos A.");
    console.log(arrayProds)

    productsArray = sortProducts(currentSortCriteria, arrayProds);
    //Muestro las categorías ordenadas

}