var productInfo = [],
    userComments = [],
    betterMsg = [],
    related = [],
    relatedList = [];
var starCount = 0,
    score = 0;
var htmlContentToAppend = ``,
    htmlContentToAppendBellow = ``,
    prodInfoContainer = ``;
var currentDate, currentDateT, hour, txt, date;

//receive array of img routes and make appears on Carousel
function showCarousel(array) {

    let li = ``;

    for (let i = 1; i < array.length; i++) {
        li += `<li data-target="#carousel" data-slide-to=` + i + `></li>`
    }

    let htmlContentToAppend = `
        <ol class="carousel-indicators">
            <li data-target="#carousel" data-slide-to="0" class="active"></li>` + li +
        `</ol>`;

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        if (i === 0) {
            htmlContentToAppend += `
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img class="d-block w-100" src=` + imageSrc + ` alt="First slide">
            </div>
            `;
        } else {
            htmlContentToAppend += `
            <div class="carousel-item">
                <img class="d-block w-100" src=` + imageSrc + ` alt="Slide">
            </div>
            `;
        }
    }
    htmlContentToAppend += `
            </div>
            <a class="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carousel" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
            </a>
        </div>
        `;
    document.getElementById("carousel").innerHTML = htmlContentToAppend;
}


function showInfo() {
    related = productInfo.relatedProducts;
    document.getElementById("selected").innerHTML = productInfo.name;

    betterManipulation();

    generalDescription();

    widthStars();

    htmlContentToAppendBellow = `
        <h3> Descripción: <hr class="my-2">
        <br>` + productInfo.name + `</h3>
        <p id="prodInfoComplete">` + productInfo.description + `</p>
        <h3 id="comments">Comentarios:</h3>` + showMessageInput() +
        `</div>
        <div id="containerMsgs"><br>`;

    document.getElementById("prod-description").innerHTML = htmlContentToAppendBellow;
    orderDate();

    showMsgList();
}

function showMessageInput() {
    return `<div id="inner" class="container">
    <form id="formulario">
        
        <div class="rate">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
        </div><br><br>
        <textarea name="texto" id="text" cols="50%" rows="10%" placeholder="Escribe un comentario.."></textarea><br>
        <input type="button" value="enviar" onclick="waiterMsg()">
    </form>`;
}

function widthStars() {
    $(document).ready(function() {
        // Gets the span width of the filled-stars
        var starRaiting = $('.fill-ratings span').width();
        //console.log(starRaiting);
        $('.star-ratings').width(starRaiting);
    });
}

function generalDescription() {
    starCount = 0;
    for (let i = 0; i < betterMsg.length; i++) {
        starCount += parseInt(betterMsg[i].score);
    }
    //console.log(starCount + " " + betterMsg.length)
    starCount = (starCount / betterMsg.length) * 20;
    //console.log(starCount)
    prodInfoContainer = `<h3>` + productInfo.name + `</h3><br>
    <hr class="my-1">
    <p id="prodCat" class="text-muted">Vendidos: ` + productInfo.soldCount + `<p>
    <hr class="my-1">
    <h4>` + productInfo.currency + " " + productInfo.cost + `</h4><hr class="my-1">
        <div class="star-ratings" href="#comments">
            <div class="fill-ratings" style="width: ` + starCount + `%;">
            <span>★★★★★</span>
            </div>
            <div class="empty-ratings">
                <span>★★★★★</span>
            </div>
            <a id="prodHyper" href="#comments">` + betterMsg.length + ` comentarios</a>
        </div>
        <hr class="my-1"><br>
        <a id="prodHyper" href="#prod-description">
        <p id="prodCat" class="text-muted">Categoría: ` + productInfo.category + `<p>
        <hr class="my-1">
            <p id="prodInfo">
            ` + "Descripción:<br>" + productInfo.description + `
            </p>`;
    document.getElementById("prod-info-container").innerHTML = prodInfoContainer;
}

//split comments for better manipulation
function betterManipulation() {
    //console.log(userComments);
    userComments.forEach(element => {
        //console.log(element.dateTime)
        date = {
            "score": element.score,
            "description": element.description,
            "user": element.user,
            "date": element.dateTime.slice(0, 10),
            "hour": element.dateTime.slice(11, 19)
        };
        betterMsg.push(date);
    });
}


function orderDate() {

    for (var i = 0; i < betterMsg.length; i++) {

        var dateI = new Date(betterMsg[i].date);

        for (var j = i + 1; j < betterMsg.length; j++) {

            var dateJ = new Date(betterMsg[j].date);

            if (dateI > dateJ) {

                var aux = betterMsg[i];
                betterMsg[i] = betterMsg[j];
                betterMsg[j] = aux;
                dateI = dateJ;
            }
        }
    }

    betterMsg = betterMsg.reverse();
}

/*----------------------------Related Prods-------------------------------*/

function relatedPublish() {
    htmlContentToAppend = "<h3>Productos relacionados</h3><div class=" + 'row' + " id=" + 'prod-list-container' + "><a href=product-info.html>";
    for (let i = 0; i < related.length; i++) {
        htmlContentToAppend += `
                <div class="column"> 
                    <div class="card list-group-item-action">
                        <img src=` + relatedList[related[i]].imgSrc + ` alt=` + relatedList[related[i]].name + `>
                        <div class="container">
                            <h5><b>` + relatedList[related[i]].name + `</b></h5>
                            <small class="text-muted">` + relatedList[related[i]].soldCount + ` vendidos</small>
                            <p>` + relatedList[related[i]].description + `</p>
                            <h6><b>` + " " + relatedList[related[i]].currency + "  " + relatedList[related[i]].cost + `</b></h6>
                        </div>
                    </div>
                </div>
                `
    }
    document.getElementById("related").innerHTML = htmlContentToAppend + "</div>";
}

/*----------------------------Publish msg---------------------------------*/

function waiterMsg() {
    let x = document.querySelectorAll('input[type=radio]');
    for (let i = 0; i < x.length; i++) {

        if (x[i].checked) {
            score = 5 - i;
        }
    }
    txt = document.getElementById("text").value;

    (((txt === "") || (txt === null) || (txt === undefined)) && (score === 0)) ? alert("Favor de completar 1 de los 2 campos."): msgPublishCustom();
}

function msgPublishCustom() {

    widthStars();

    currentDate = new Date();
    let currentMonth = (currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
    currentDateT = currentDate.getFullYear() + '-' + (currentMonth) + '-' + currentDate.getDate();
    //console.log(currentDateT)
    getCurrentHour();
    //console.log(fullDate)
    date = {
        "score": score,
        "description": txt,
        "user": returnUser(),
        "date": currentDateT,
        "hour": getCurrentHour()
    };

    cleanerVar();

    betterMsg.push(date);
    //console.log(fullDate);
    document.getElementById("formulario").reset();

    orderDate();

    generalDescription();

    showMsgList();
}

function cleanerVar() {
    score = 0;
    txt = "";
}

function getCurrentHour() {
    hour = new Date();
    let currentHour = hour.getHours() > 12 ? hour.getHours() : (hour.getHours() < 10 ? "0" + hour.getHours() : hour.getHours());
    let currentMinute = hour.getMinutes() < 10 ? "0" + hour.getMinutes() : hour.getMinutes();
    let currentSeconds = hour.getSeconds() < 10 ? "0" + hour.getSeconds() : hour.getSeconds();
    return currentHour + ":" + currentMinute + ":" + currentSeconds;
    //console.log(currentHour + ":" + currentMinute + ":" + currentSeconds);
}


function showMsgList() {
    //console.log(fullDate)

    let comments = "";
    let scoreI = 0;
    for (let i = 0; i < betterMsg.length; i++) {
        datePost = betterMsg[i].date.slice(8, 10) + "/" + betterMsg[i].date.slice(5, 7) + "/" + betterMsg[i].date.slice(0, 4) + ` ` + betterMsg[i].hour;
        scoreI = betterMsg[i].score * 24.6;
        //console.log(scoreI)
        comments += `
        <div class="card" style="display: none;">
            <h5 class="card-header"><div>` + betterMsg[i].user + `<p class="text-muted"> ` + datePost + `</p></h5>
            <div class="card-body">
                <h5 class="card-title">
                <div class="star-ratings">
                    <div class="fill-ratings" style="width: ` + scoreI + `%;">
                    <span>★★★★★</span>
                    </div>
                    <div class="empty-ratings">
                        <span>★★★★★</span>
                    </div>
                </div></h5>
                <p class="card-text">` + betterMsg[i].description + `</p>
            </div>
        </div><br>
        `
    }
    comments += `</div>
    <div id="moreLess">
        <input id="moreButton" type="button" value="Ver más" onclick="showMore()">
        <input id="lessButton" type="button" value="Ver menos" onclick="showLess()">
    </div>`;
    document.getElementById("containerMsgs").innerHTML = "";
    document.getElementById("containerMsgs").insertAdjacentHTML("afterbegin", comments);
    initialLoads();
}

/*----------------------------Loading or Hidding msgs----------------------------*/

var msgList = [],
    msgListHide = [],
    list = [],
    items = [];

function initialLoads() {
    msgListHide = Array.prototype.slice.call(document.querySelectorAll('#containerMsgs div.card'));
    msgList = Array.prototype.slice.call(document.querySelectorAll('#containerMsgs div.card'));
    list = Array.prototype.slice.call(document.querySelectorAll("#containerMsgs div.card"));
    showMoreInitial();
}

function showMore() {
    msgList = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].style.display == "none") {
            msgList[i] = list[i]
        }
    }
    removeEmpty(msgList);
    showMoreInitial();
}

function showMoreInitial() {
    itemsRange();
    for (let i = 0; i < items.length; i++) {
        items[i].style.display = "block";
    }
    visibilityButtons();
}

function showLess() {
    let hide = hideItems();
    for (let i = 0; i < hide.length; i++) {
        hide[i].style.display = "none";
    }
    visibilityButtons();
}

function hideItems() {
    let itemsHide = [];
    for (let i = 0; i < list.length; i++) {
        if (list[i].style.display == "block") {
            itemsHide[i] = list[i];
        }
    }
    return itemsHide;
}

function itemsRange() {
    let max = 0;
    items = [];
    (msgList.length % 2 == 0) ? max = msgList.length / 2: max = (msgList.length - 1) / 2;
    items = msgList.slice(0, max);

}

function visibilityButtons() {
    let temp = [];

    for (let i = 0; i < list.length; i++) {
        if (list[i].style.display == "block") {
            temp[i] = list[i]
        }
    }

    if (temp.length == list.length) {
        document.getElementById('moreButton').style.display = "none";
    } else {
        if (temp.length >= 0) {
            document.getElementById('moreButton').style.display = "block";
        }
    }

    if (temp.length != 0) {
        document.getElementById('lessButton').style.display = "block";
    } else {
        if (temp.length <= 2) {
            document.getElementById('lessButton').style.display = "none";
        }
    }
}

function removeEmpty(listItems) {
    listItems.sort();
    for (let i = 0; i < listItems.length + 1; i++) {
        ((listItems[i] === undefined) || (listItems[i] == null) || (listItems[i] == "")) ? listItems.pop(): "";
    }
}

/*------------------------Initial Load------------------------*/

function prodInfoURL() {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        resultObj.status === "ok" ? (productInfo = resultObj.data, showCarousel(productInfo.images), showInfo(),
                relatedPublish()) :
            errorLoad(resultObj.status, 2);
    })
}

function prodsCharge() {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        resultObj.status === "ok" ? (relatedList = resultObj.data) : errorLoad(resultObj.status, 3);
    });
}

function errorLoad(errorStatus, sender) {
    switch (sender) {
        case 1:
            console.log(errorStatus + " Comentarios");
            break;
        case 2:
            console.log(errorStatus + " Producto")
            break;
        case 3:
            console.log(errorStatus + " Relacionados")
            break;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        resultObj.status === "ok" ? (userComments = resultObj.data, prodsCharge(), prodInfoURL()) :
            errorLoad(resultObj.status, 1);
    })
});