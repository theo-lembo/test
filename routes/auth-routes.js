const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/index', (req, res) => {
    res.render('index', { user: req.user });
});

//auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

//auth con google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

//callback ruta para google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    //res.send(req.user)
    res.redirect('/inicio/');
})

//https://codeforgeek.com/handle-get-post-request-express-4/

module.exports = router;