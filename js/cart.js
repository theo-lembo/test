var cart = [],
    item = [],
    isChecked = [],
    inputList = [],
    okMsg = [],
    trueVar = 0,
    urlCart = "",
    selected = 0,
    subtotal = 0,
    tempSubtotal = 0,
    shipping = 0,
    tempShipping = 0,
    total = 0,
    country = [],
    sModal = 2,
    cardNumber = "",
    cvv = 0,
    expiration = "",
    accountDir = 0,
    payment = false;

const
    generalList = document.querySelectorAll.bind(document),
    checkboxList = document.querySelectorAll("input[type=radio][name=drone]"),
    chkbxModal = document.querySelectorAll("input[type=radio][name=modal]"),
    evtQuantity = ["click", "keyup"];

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
                        <small class="text-muted">
                            <input type="button" value="Borrar" onclick="deleted(` + i + `)"></input>
                        </small>
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

    for (let i = 0; i < evtQuantity.length; i++) {
        for (let n = 0; n < quantityList.length; n++) {
            quantityList[n].addEventListener(evtQuantity[i], ({ target }) => {
                generalList("#currency")[n].innerHTML = " " + (generalList("#unitCost")[n].innerHTML * target.value);
                subtotalF();
            })
        }

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
/*-----------------------Finding radiobutton checked on Shipping---------------------------*/

checkboxList.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        Array.from(checkboxList)
            .filter(i => i.checked ? shipping = i.value : "");
        tempShipping = shippingVarF();
        totalF();
        document.getElementById("shipping").innerText = "$ " + tempShipping;
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
    let tmpPayment = payment;
    let ship = (generalList("#shipping")[0].innerText != "$ 0");
    let country = (document.getElementById("country").value != "--");
    let dir = (document.getElementById("dir").value != "");
    let streetNumber = (document.getElementById("num").value != "");
    let corner = (document.getElementById("corner").value != "");
    !(ship && tmpPayment && country && dir && streetNumber && corner) ? alert("Completar todos los campos"):
        (alert(okMsg.msg),
            location.href = "inicio.html");

})

/*-----------------------------------Delete one item-----------------------------------*/

function deleted(position) {
    document.getElementById("buyed").innerHTML = "";
    cart.articles.splice(position, 1);
    showCart();
    customQuantity();
    subtotalF();
}

/*-----------------------------Selected payment method on Modal-----------------------------*/

chkbxModal.forEach(function(checkboxModal) {
    checkboxModal.addEventListener('change', function() {
        Array.from(chkbxModal)
            .filter(i => i.checked ? (sModal = i.value, invertState()) : "");
    })
});

/*-------------------------------Functions to invert the status of the payment modal-------------------------------*/
function invertState() {
    sModal = parseInt(modalSelected());
    (sModal === 0) ? blockUnblock(0, 1): blockUnblock(1, 0);
}

function blockUnblock(num, sNum) {
    let tmpSelected, notSelected;
    tmpSelected = Array.prototype.slice.call(document.querySelectorAll('div.row > div.column')[num].children);
    notSelected = Array.prototype.slice.call(document.querySelectorAll('div.row > div.column')[sNum].children);
    for (selected in tmpSelected) {
        tmpSelected[selected].disabled ? (tmpSelected[selected].disabled = !tmpSelected[selected].disabled) : "";
    }
    for (selected in notSelected) {
        notSelected[selected].disabled = !notSelected[selected].disabled;
    }
}

/*-----------------------------Return number of modal checked-----------------------------*/

function modalSelected() {
    return document.querySelectorAll('div.modal-body >div>div.row> input[type=radio]:checked')[0].defaultValue;
}

/*-----------------------------Payment Modal-----------------------------*/

document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    controlModal() ?
        $("#exampleModalCenter").modal('hide') : alert("Completar los campos de pago.");
});

/*-----------------------------Payment Control-----------------------------*/

function controlModal() {
    tmpCardNumber = document.getElementById("cardNumber");
    tmpCvv = document.getElementById("cvv");
    tmpExpiration = document.getElementById("expiration");
    tmpAccountDir = document.getElementById("accountDir");

    sModal = parseInt(modalSelected());

    if ((sModal == 0) && ((tmpCardNumber.value != "") && (tmpCvv.value != 0) && (tmpExpiration.value != ""))) {
        payment = true;
        cardNumber = tmpCardNumber.value;
        cvv = tmpCvv.value;
        expiration = tmpExpiration.value;
    } else {
        if ((sModal == 1) && (tmpAccountDir.value != "")) {
            payment = true;
            accountDir = tmpAccountDir.value;
        } else {
            sModal = 2;
        }
    }
    if (sModal === 2) { return false; } else { return true; }
}

/*-----------------------------List Of Countrys-----------------------------*/
function countryList() {
    countryTMP = "";
    for (let i = 0; i < country.length; i++) {
        countryTMP = country[i];
        document.getElementById("country").innerHTML += ` <option value="` + countryTMP + `">` + countryTMP + `</option>`;
    }
}



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
    getJSONData(COUNTRY_LIST).then(function(resultObj) {
        resultObj.status === "ok" ? (country = resultObj.data.country, countryList()) :
            console.log("Country " + resultObj.status);
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    pickYourCart();
    (!(urlCart === "") || !(urlCart === undefined)) ? getJson(): "";
});