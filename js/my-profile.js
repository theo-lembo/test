const
    form = document.getElementById("profile-info"),
    inputs = Array.prototype.slice.call(document.querySelectorAll('.col-sm-12 input')),
    edit = document.getElementById("edit"),
    fName = document.getElementById("fName"),
    mName = document.getElementById("mName"),
    surname = document.getElementById("surname"),
    sSurname = document.getElementById("sSurname"),
    age = document.getElementById("age"),
    mail = document.getElementById("mail"),
    phone = document.getElementById("phoneNumber"),
    photo = document.getElementById("photoSrc");

var user = {},
    myProfile = {},
    clickerPhoto = 0;

/*----------------------------------------Basic form check---------------------------------------*/
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let messages = [];
    let tmpPhone = phone.value;
    if (fName.value === '' || fName.value == null) {
        messages.push('Ingrese Primer Nombre')
    }

    if (surname.value === '' || surname.value == null) {
        messages.push('Ingrese Primer Apellido')
    }

    if (((tmpPhone.length == 0) || (tmpPhone.length < 6) || (tmpPhone.length > 11))) {
        messages.push("Su número de telefono debe contener entre 6 y 11 digitos");
        console.log(tmpPhone)
    }

    if (messages.length > 0) {
        document.getElementById("error").innerText = messages.join(', ');
        messages = null;
    } else {
        document.getElementById("error").innerText = "";
        saveUserData();
    }
});


/**/
photo.addEventListener("click", function(e) {
    e.preventDefault();
    clickerPhoto === 1 ? "" :
        ((window.confirm('Se recomienda usar la pagina getavataaars.com:' + "" + '\nAceptar para Confirmar, Cancelar para permanecer aquí')) ?
            window.open('https://getavataaars.com', '_blank') : "")
    clickerPhoto = 1;
});

/*----------------------------------------Save data filled by user---------------------------------------*/
function saveUserData() {
    user = {
        "name": fName.value,
        "mName": mName.value,
        "surname": surname.value,
        "sSurname": sSurname.value,
        "age": age.value,
        "mail": mail.value,
        "photoSrc": getIconUrl(document.getElementById("photoSrc").value),
<<<<<<< Updated upstream
        "phone": phone.value,
    }
    localStorage.setItem("userProfile", JSON.stringify(user));
    profileEdit();
    localStorage.removeItem("gUserLog");
=======
        "phone": phone.value
    };
    localStorage.setItem("userProfile", JSON.stringify(user));
    profileEdit();
    localStorage.removeItem("gUserLog");
    listOfUsers();
>>>>>>> Stashed changes
    location.reload();
}

/*-------------------------------Function to invert the edit status of the profile-------------------------------*/
function profileEdit() {
    for (input in inputs) {
        inputs[input].disabled = !inputs[input].disabled;
    }
}

/*------------------------------------------Auto fill profile------------------------------------------*/
function googleFill() {
    myProfile = JSON.parse(localStorage.getItem("gUserLog"));
    if ((myProfile != null) || (myProfile != undefined)) {
        let gName = myProfile.name,
            gLname = myProfile.lName,
            gPhotoSrc = myProfile.photoSrc,
            gmail = myProfile.mail;

        fName.value = gName;
        surname.value = gLname;
        photo.value = gPhotoSrc;
        mail.value = gmail;
    }
}

function userFill() {
    myProfile = JSON.parse(localStorage.getItem("userProfile"));
    let
        uName = myProfile.name,
        uMName = myProfile.mName,
        uSurname = myProfile.surname,
        usSurname = myProfile.sSurname,
        uAge = myProfile.age,
        uMail = myProfile.mail,
        uPhone = myProfile.phone,
        uPhotoSrc = myProfile.photoSrc;

    (uPhotoSrc.slice(0, 24) === "https://getavataaars.com") ? uPhotoSrc = getIconUrl(uPhotoSrc): "";


    fName.value = uName;
    mName.value = uMName;
    surname.value = uSurname;
    sSurname.value = usSurname;
    age.value = uAge;
    mail.value = uMail;
    phone.value = uPhone;
    photo.value = uPhotoSrc;
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
}
/*------------------------------------------Change url of getavataaars.com------------------------------------------*/

function getIconUrl(src) {
    let temp = "";

    (src.slice(0, 24) === "https://getavataaars.com") ?

<<<<<<< Updated upstream
    temp = src.replace("https://getavataaars.com", "https://avataaars.io"): "";
    return temp;
}

=======
    temp = src.replace("https://getavataaars.com", "https://avataaars.io"): temp = src;
    return temp;
}

/*----------------------------------Make a list of users----------------------------------*/

function listOfUsers() {
    tmpUser = localStorage.getItem("user");
    tmpProfile = JSON.parse(localStorage.getItem("userProfile"));
    listUsers = JSON.parse(localStorage.getItem("userList"));

    if (listUsers === null) {
        makeNewOne(tmpUser, tmpProfile);
    } else {
        exist = existence(tmpUser, listUsers);
        exist != undefined ? ("",
                makeNewOne(tmpUser, tmpProfile)) :
            makeNewOne(tmpUser, tmpProfile);
    }

}

function existence(tmpUser, listUsers) {
    return listUsers[tmpUser];
}

function makeNewOne(nick, profile) {
    userList = {};

    userList[nick] = {
        name: profile.name,
        mName: profile.mName,
        surname: profile.surname,
        sSurname: profile.sSurname,
        age: profile.age,
        mail: profile.mail,
        phone: profile.phone,
        photoSrc: profile.photoSrc
    };
    localStorage.setItem("userList", JSON.stringify(userList));
}


>>>>>>> Stashed changes
function principal() {
    profileEdit();
    (localStorage.getItem("userProfile") == null) ? googleFill(): userFill();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    principal();
});