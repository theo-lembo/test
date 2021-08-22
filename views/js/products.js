var arrayProds = [];
var verificador = 1;

function customButton() {
    document.getElementById("vista").innerHTML = `
    <a id="buttonCustom" href="javascript:verifica();">Vista</a>` +
        `<h2>Productos</h2>` +
        `<p class="lead">Verás aquí todos los productos del sitio.</p>`;
}

function showProductsCard() {
    verificador = 1;
    let htmlContentToAppend = "";
    for (let i = 0; i < arrayProds.length; i++) {
        let producto = arrayProds[i];
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
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

function showProductsList() {
    verificador = 2;
    let htmlContentToAppend = "";
    for (let i = 0; i < arrayProds.length; i++) {
        let producto = arrayProds[i];
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
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

//Función para hacer el cambio de Lista a Cards, de paso uso el if raro (codicion ? res1 : res2) que ahorra yema de dedos.
function verifica() {
    verificador == 1 ? showProductsList() : showProductsCard();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        resultObj.status === "ok" ? arrayProds = resultObj.data : console.log(resultObj.status);
        showProductsCard();
        customButton();
    });
});;