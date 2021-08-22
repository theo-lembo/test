const usuario = document.getElementById("user");
const pass = document.getElementById('password');
const form = document.getElementById('login-form');
const errorMSG = document.getElementById('error');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];
    var clave = pass.value;
    if (usuario.value === '' || usuario.value == null) {
        messages.push('Ingrese Usuario')
    }
    if (((clave.length == 0) || (clave.length < 6) || (clave.length > 8))) {
        messages.push("La contraseña debe contener entre 6 y 8");
    }
    if (messages.length > 0) {
        errorMSG.innerText = messages.join(', ');
        messages = null;
    } else {
        //$.post("/loginT", { user: usuario.value, password: pass.value });
        //console.log("Send");
        location.href = "/start";
    }
});


function onSignIn() {
    location.href = "/auth/google";
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});