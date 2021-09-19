const usuario = document.getElementById("user");
const pass = document.getElementById("password");
const form = document.getElementById("login-form");
const errorMSG = document.getElementById("error");
var clicker = false;

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];
    let clave = pass.value;
    if (usuario.value === '' || usuario.value == null) {
        messages.push('Ingrese Usuario')
    }
    console.log(clave.length + " " + clave)
    if (((clave.length == 0) || (clave.length < 6) || (clave.length > 8))) {
        messages.push("La contraseña debe contener entre 6 y 8");
    }
    if (messages.length > 0) {
        document.getElementById("error").innerText = messages.join(', ');
        messages = null;
    } else {
        guardarUser(usuario.value);
        location.href = "inicio.html";
    }
});

function guardarUser(user) {
    localStorage.setItem("user", user);
    document.cookie = "username=" + user + "; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
}

//"preventDefault" para evitar el logueo automatico de google.
function google() {
    clicker = true;
}

function onSignIn(googleUser) {
    if (clicker) {
        let profile = googleUser.getBasicProfile();
        //console.log(profile.getEmail())
        if (profile.getEmail() != "") {
            guardarUser(profile.getName());
        }
        location.href = "inicio.html";
    }
}

function googleKey() {
    alert("El siguiente msj va a solicitar la key")
    let key = prompt("Google Key hint: 9-k");
    return key;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    let yes = 0;
    yes = prompt("Ingrese 1 para Ingresar con Google")
    if (yes === "1") {
        document.head.innerHTML += `
        <meta name="google-signin-client_id" content="` + googleKey() + `.apps.googleusercontent.com">
        <meta name="google-signin-scope" content="profile email">`;
    }
});