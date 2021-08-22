const express = require('express');
const authRoutes = require('./routes/auth-routes');
const inicioRoutes = require('./routes/inicio-routes');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const app = express();
const router = require('express').Router();

//setup view engine
app.set('view engine', 'ejs');

//Cookies settings
app.use(
    cookieSession({
        maxAge: 24 * 60 * 60 * 1000,
        keys: [keys.session.cookieKey]
    }));

//inicializar passport
app.use(passport.initialize());
app.use(passport.session());


// conexion mongoDB
mongoose
    .connect(keys.mongodb.dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("Conexión con mongodb Exitosa!"))
    .catch(err => console.log(err));

//set up routes
app.use('/auth', authRoutes);
app.use('/inicio', inicioRoutes);

//Sin esta línea no carga css ni js >-<
app.use(express.static(__dirname + '/views'));

app.listen(3000, () => {
    console.log('Escuchando requests en puerto 3000')
})


//-------rutas para todos los "html"--------//
app.get('/', (req, res) => {
    res.render('index');
})

app.get('/products', (req, res) => {
    res.render('products');
})

app.get('/categories', (req, res) => {
    res.render('categories');
})

app.get('/start', (req, res) => {
    res.render('start');
})

app.get('/cart', (req, res) => {
    res.render('cart');
})

app.get('/category-info', (req, res) => {
    res.render('category-info');
})

app.get('/my-profile', (req, res) => {
    res.render('my-profile');
})

app.get('/product-info', (req, res) => {
    res.render('product-info');
})

app.get('/sell', (req, res) => {
        res.render('sell');
    })
    //-------rutas para todos los "html"--------//

/*---------------------------Normal user a db---------------------*/
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const User = require('./models/user-model');
app.post('/loginT', async(req, res) => {
    var user = req.body.user;
    var password = await bcrypt.hash(req.body.password, 10);
    //console.log('User name = ' + user + ', password is  ' + password);
    User.findOne({ username: user }).then((currentUser) => {
        if (currentUser) {
            //Usuario existente
            console.log("Usuario existente:" + currentUser);
            res.redirect("/inicio")
        } else {
            //Crear usuario
            new User({
                username: user,
                googleId: null,
                password: password
            }).save();

        }
    })
});


//Oauth gracia a tuto "OAuth (Passport.js) Tutorial" by "The Net Ninja"
//npm init (app.js) <-- Primer comando
//npm install ejs express <-- Api magica
//npm install nodemon -g <--Local server magic
//npm install passport passport-google-oauth20 <--Google Magic
// npm i passport-local <--- Local magic
//npm install cookie-session <--Cookie magic
//npm i bcrypt <-- Encriptador magico

//server start: nodemon app.js