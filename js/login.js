const usuario = document.getElementById("user");
const pass = document.getElementById('password');
const form = document.getElementById('login-form');
const errorMSG = document.getElementById('error');

form.addEventListener('submit', (e) => {
    let messages = [];
    e.preventDefault();
    var clave = pass.value;
    if (usuario.value === '' || usuario.value == null) {
        messages.push('Ingrese Usuario')
    }
    console.log(clave.length + " " + clave)
    if (((clave.length == 0) || (clave.length < 6) || (clave.length > 8))) {
        messages.push("La contraseña debe contener entre 6 y 8");
    }
    if (messages.length > 0) {
        errorMSG.innerText = messages.join(', ');
        messages = null;
    } else {
        location.href = "inicio.html";
    }
});

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    if (profile.getEmail() != "") {
        var myKeyVals = { token: googleUser.getAuthResponse().id_token }
    }
    //console.log(myKeyVals.token)
    //alert(myKeyVals.token)
    location.href = "inicio.html";
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {});