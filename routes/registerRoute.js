const bcrypt = require('bcrypt'); //Biblioteca para incriptar senha
const notAuth = require('../auth/authChecks').checkNotAuth;

const users = [];

const registerRoute = (app) => {
    app.route('/register')
        .get(notAuth, (req, res) => {
            res.render('register.ejs');
        })
        .post(notAuth, async (req, res) => {
            try {
                const encryptPassword = await bcrypt.hash(req.body.password, 10);

                users.push({
                    id: Date.now().toString(),
                    name: req.body.name,
                    email: req.body.email,
                    password: encryptPassword
                });
                res.redirect('/login');
            } catch (erro) {
                res.redirect('/register');
            }
            console.log(users);
        })
};

module.exports = { registerRoute, users };