const localStrategy = require('passport-local').Strategy; //Usado para a configuracao da auth
const bcrypt = require('bcrypt'); //Biblioteca para incriptar senha

function init(passport, getUserByEmail, getUserById){
    const auth = async (email, passport, done) => {
        const user = getUserByEmail(email);

        if (user == null){ //Verifica se o campos estao vazios e mostra o erro
            return done(null, false, { message: " Email not registred " }); 
        }

        try {   //Verificacao da senha do usuario
            if (await bcrypt.compare(passport, user.password)) { 
                return done(null, user); //caso verdadeiro retorna o usuario
            } else {
                return done(null, false, { message: " Password incorrect " }); //Caso nao seja verdadeiro retona o erro
            }
        } catch (e) {
            done(e);
        }
    }

    passport.use(new localStrategy({ usernameField: 'email' }, auth));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id));
    });
};

module.exports = init;