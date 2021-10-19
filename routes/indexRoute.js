const isAuth = require('../auth/authChecks').checkAuth;

const indexRoute = (app) => {
    app.route('/')
        .get(isAuth, (req, res) => {
            res.render('index.ejs');
        })
};

module.exports = indexRoute;