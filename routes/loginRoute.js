const passport = require("passport");
const notAuth = require('../auth/authChecks').checkNotAuth;

const loginRoute = (app) => {
    app.route('/login')
        .get(notAuth, (req, res) => {
            res.render('login.ejs');
        })
        .post(notAuth, passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }))
};

module.exports = loginRoute;