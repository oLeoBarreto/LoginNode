const express = require('express');
const bodyParse = require('body-parser'); //Midleware
const passport = require('passport'); //Biblioteca de autenticacao
const session = require('express-session'); //Para criar uma sesao ao autenticar
const flash = require(`express-flash`);
const app = express();

const users = require('./routes/registerRoute').users;
const initPassport = require('./auth/passportConfig');
initPassport(
    passport, 
    email => users.find(user => user.email === email), //Pega o email de cada usuario registrado
    id => users.find(user => user.id === id) 
);

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.set('view-engine', 'ejs');
app.use(flash());
app.use(session({
    secret: 'okn1felknokj53fs2k',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); 

const loginRoute = require('./routes/loginRoute');
const registerRoute = require('./routes/registerRoute').registerRoute;
const indexRoute = require('./routes/indexRoute');

//Usando rotas
indexRoute(app);
registerRoute(app);
loginRoute(app);

app.delete('/logout', (req, res) => {
    req.logOut();
    req.redirect('/login')
})

module.exports = app;