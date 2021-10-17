var cart = [],
    item = [],
    isChecked = [],
    inputList = [],
    okMsg = [],
    trueVar = 0,
    checkboxList = document.querySelectorAll("input[type=radio][name=drone]"),
    generalList = document.querySelectorAll.bind(document),
    urlCart = "",
    selected = 0,
    subtotal = 0,
    tempSubtotal = 0,
    shipping = 0,
    tempShipping = 0,
    total = 0;

/*-------------------------------Send cart to html-------------------------------*/
function showCart() {
    let htmlContentToAppend = ``,
        box = ``;
    item = [];
    for (let i = 0; i < cart.articles.length; i++) {
        item = cart.articles[i];
        box = `<input id="quantity" type="number" min="1" value="` + item.count + `">`;
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class ="row">
                <div class="col-3">
                    <img src=` + item.src + ` alt=` + item.name + ` class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h5><b>` + item.name + `</b></h5>
                    </div>
                        <small class="text-muted">` + box + ` cantidad comprados</small>
                        <p>Precio unidad: <b id="unitCost">` + item.unitCost + `</b></p>
                        <h6><b>` + "Subtotal: " + item.currency + `<b  id="currency"> ` + (item.unitCost * item.count) + `</b></h6>
                    </div>
                </div>
            </div>`;
        subtotalF();
    }
    document.getElementById("buyed").innerHTML += htmlContentToAppend + "</div>";
    subtotal = 0;
}



/*-------------------------------Quantity items-------------------------------*/


function customQuantity() {
    let quantityList = generalList('#quantity');

    for (let i = 0; i < quantityList.length; i++) {
        quantityList[i].addEventListener('keyup', ({ target }) => {
            generalList("#currency")[i].innerHTML = " " + (generalList("#unitCost")[i].innerHTML * target.value);
            subtotalF();
        })
    }
    subtotal = 0;
}

/*-------------------------------Make bill-----------------------------------*/

function subtotalF() {
    let currency = generalList("#currency");
    for (let i = 0; i < generalList("#currency").length; i++) {
        subtotal += parseInt(currency[i].innerHTML);
    }
    document.getElementById("subtotal").innerText = "$ " + subtotal;
    tempSubtotal = subtotal;
    shippingF();
    totalF();
    subtotal = 0;
}

function shippingF() {
    parseInt(generalList("#shipping")[0].innerText) != NaN ?
        document.getElementById("shipping").innerText = "$ " + shippingVarF() : "";
}

function totalF() {
    shippingF();
    total = tempShipping + tempSubtotal;
    document.getElementById("total").innerText = "$ " + total;
}

/*-------------------------Update Shipping Var-------------------------*/

function shippingVarF() {
    tempShipping = shipping / 100;
    tempShipping = tempShipping * tempSubtotal;
    return tempShipping;
}
/*-----------------------Finding radiobutton checked---------------------------*/

checkboxList.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        Array.from(checkboxList)
            .filter(i => i.checked ? shipping = i.value : "");
        tempShipping = shippingVarF();
        totalF();
        document.getElementById("shipping").innerText = " " + tempShipping;
    })
    tempSubtotal = 0;
});

/*-------------------------------Select one cart-------------------------------*/
function pickYourCart() {
    let chosenCart = "";
    chosenCart = prompt("Ingresar 1 o 2 para elegir su carrito: ");
    switch (parseInt(chosenCart)) {
        case 1:
            urlCart = CART_INFO_URL;
            break;
        case 2:
            urlCart = CART_INFO2_URL;
            break;
        default:
            alert("Fuera de rango");
            pickYourCart();
            break;
    }
}

/*----------------------------Make a better list----------------------------*/

function remakeList() {
    for (let i = 0; i < cart.articles.length; i++) {
        let tmpItem = cart.articles[i];
        tmpItem.currency === "USD" ?
            (tmpItem.currency = "UYU", tmpItem.unitCost = (tmpItem.unitCost * 40)) : "";
    }
    showCart();
}

document.getElementById("tryBuy").addEventListener("submit", (e) => {
    e.preventDefault();
    let payment = (document.getElementById("payment").value != "--");
    let ship = (generalList("#shipping")[0].innerText != "$ 0");
    let country = (document.getElementById("country").value != "--");
    let dir = (document.getElementById("dir").value != "");
    let streetNumber = (document.getElementById("num").value != "");
    let corner = (document.getElementById("corner").value != "");
    !(ship && payment && country && dir && streetNumber && corner) ? alert("Completar todos los campos"):
        (alert(okMsg.msg),
            location.href = "inicio.html");

})

/*----------------------------Initial load----------------------------*/
function getJson() {
    getJSONData(urlCart).then(function(resultObj) {
        resultObj.status === "ok" ? (cart = resultObj.data, remakeList(), customQuantity(), subtotalF()) :
            console.log("Cart " + resultObj.status);
    });
    getJSONData(CART_BUY_URL).then(function(resultObj) {
        resultObj.status === "ok" ? okMsg = resultObj.data :
            console.log("Msg " + resultObj.status);
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    pickYourCart();
    (!(urlCart === "") || !(urlCart === undefined)) ? getJson(): "";
});