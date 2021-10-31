var arrayProds = [];
var verificador = 1;

//Order variables
const ORDER_ASC_BY_COST = "MinMax";
const ORDER_DESC_BY_COST = "MaxMin";
const ORDER_BY_PROD_SOLD = "Ventas.";
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
//search variable
var input = document.getElementById("searcher")

function customButton() {
    document.getElementById("vista").innerHTML = `
    <a id="buttonCustom" href="javascript:verifica();">Vista</a>` +
        `<h2>Productos</h2>` +
        `<p class="lead">Verás aquí todos los productos del sitio.</p>`;
}

function showProductsCard() {
    verificador = 2;
    let htmlContentToAppend = "";
    for (let i = 0; i < arrayProds.length; i++) {
        let producto = arrayProds[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(producto.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(producto.cost) <= maxCost))) {
            htmlContentToAppend += `
                <a class="col-md-4 list-group-item list-group-item-action" href="product-info.html">
                
                <div class="card mb-4 shadow-sm">
                    <img src=` + producto.imgSrc + ` alt=` + producto.name + ` class="bd-placeholder-img card-img-top"
                     width="100%" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" 
                     aria-label="Placeholder: Thumbnail">

                    <div class="card-body">
                        <h5><b>` + producto.name + `</b></h5>
                        <small class="text-muted">` + producto.soldCount + ` vendidos</small>
                        <p>` + producto.description + `</p>
                        <h6><b>` + " " + producto.currency + "  " + producto.cost + `</b></h6>
                    </div>
                </div>
            </a>
                `
        }
    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

function showProductsList() {
    verificador = 1;
    let htmlContentToAppend = "";
    for (let i = 0; i < arrayProds.length; i++) {
        let producto = arrayProds[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(producto.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(producto.cost) <= maxCost))) {
            htmlContentToAppend += `
            <a class="list-group-item list-group-item-action" href="product-info.html">
                <div class="row">
                    <div class="col-sm-4">
                        <img src="` + producto.imgSrc + `" alt="` + producto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4><b>` + producto.name + `</b></h4>
                            <small class="text-muted">` + producto.soldCount + ` vendidos</small>
                        </div>
                        <h5><b>` + producto.currency + "  " + producto.cost + `</b></h5>
                        <p class="mb-1">` + producto.description + ` </p>
                    </div>
                </div>
            </a>`
        }
    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

//Función para hacer el cambio de Lista a Cards, de paso uso el if raro (codicion ? res1 : res2) que ahorra yema de dedos.
function verifica() {
    verificador == 2 ? showProductsList() : showProductsCard();
}

function mantiene() {
    verificador != 2 ? showProductsList() : showProductsCard();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        resultObj.status === "ok" ? sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data) : console.log(resultObj.status);
        customButton();
        verifica();
    });

    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortBySold").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;
        mantiene();
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        } else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        } else {
            maxCost = undefined;
        }
        mantiene();
    });
});;


/*------------------------------Filtros de busqueda-------------------------------*/

/*$(document).ready(function() {
    $("#searcher").on("keyup", function() {
        let value = $(this).val().toLowerCase();
        $("#prod-list-container .list-group-item-action").filter(function() {
            $(this).toggle($(this).text()
                .toLowerCase().indexOf(value) > -1)
        });
    });
});

document.getElementById("searcher").addEventListener("keyup", function() {
    let value = $(this).val().toLowerCase();

    $("#prod-list-container .list-group-item-action").filter(function() {
        $(this).toggle($(this).text()
            .toLowerCase().indexOf(value) > -1)
    });
});*/

input.addEventListener("keyup", function() {
    let filtro, container, item, div, txtValue;
    filtro = input.value.toUpperCase();
    container = document.getElementById("prod-list-container");
    item = container.getElementsByClassName("list-group-item-action");
    for (let i = 0; i < item.length; i++) {
        div = item[i].getElementsByTagName("div")[0];
        txtValue = div.textContent || div.innerText;
        //console.log(txtValue)
        if (txtValue.toUpperCase().indexOf(filtro) > -1) {
            item[i].style.display = "";
        } else {
            item[i].style.display = "none";
        }
    }
});

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost < bCost) { return -1; }
            if (aCost > bCost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost > bCost) { return -1; }
            if (aCost < bCost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLD) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    return result;
}

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;
    productsArray != undefined ? arrayProds = productsArray : "";
    productsArray = sortProducts(sortCriteria, arrayProds);
    //Muestro las categorías ordenadas
    mantiene();
}