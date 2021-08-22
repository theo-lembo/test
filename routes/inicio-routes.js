const router = require('express').Router();

const authCheck = (req, res, next) => {
    if (!req.user) {
        console.log("Non conectado");
        res.redirect(".");
    } else {
        console.log("Conectado");
        next();
    }
};


router.get('/', authCheck, (req, res) => {
    console.log("Inicio")
    res.redirect("/start")
})

module.exports = router;

//https://youtu.be/QuXsbg-tX58?list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x profile info