const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});


passport.use(
    new GoogleStrategy({
        //options for strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        //Chequear existencia usuario
        User.findOne({ googleId: profile.id }).then((currentUser) => {
            if (currentUser) {
                //Usuario existente
                console.log("Usuario existente:" + currentUser);
                done(null, currentUser);
            } else {
                //Crear usuario
                new User({
                    username: profile.displayName,
                    googleId: profile.id,
                    password: null
                }).save().then((newUser) => {
                    console.log('Nuevo usuario creado: ' + newUser);
                    done(null, newUser);
                });
            }
        });
    })
)