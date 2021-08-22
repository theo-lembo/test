/*-----------------------------Local------------------------------ 
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt')

function initialize(passport, getUser) {
    const authenticateUser = (user, password, done) => {
        const usuario = getUser(user);
        if (usuario == null) {
            return done(null, false, { message: 'No existe el usuario' })
        }
        try {
            if (await bycrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Contraseña incorrecta' })
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({ usernameField: 'user' }))

    passport.serializeUserLocal((user, done) => {});

    passport.deserializeUserLocal((id, done) => {});
}

module.exports = initialize;
/*-------------------------------Local----------------------------*/