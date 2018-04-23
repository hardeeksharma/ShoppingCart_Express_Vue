const passport = require('passport')
const localstrategy = require('passport-local').Strategy;
const {User} = require('./modal/modals')
passport.serializeUser((user, done) => {

    if (user && user.id) {
        return done(null, user.id)
    }
    done(new Error("User or  User id not found"));
})

passport.deserializeUser((userId, done) => {

    User.findOne({
        where: {
            id: userId
        }
    }).then((user) => {
        if (user)
            done(null, user)
        else
            done(new Error("No user found"))
    }).catch(err => {
        done(err)
    })
})

passport.use(new localstrategy({usernameField: "email", passwordField: "password"}, (username, password, done) => {

    User.findOne({
        where: {email: username}
    }).then(user => {
        console.log(user)
        if (!user)
            return done(null, false, {message: 'Email does not exist'})
        if (user.password !== password) {
            return done(null, false, {message: 'Password does not match'})
        }
        done(null, user)
    }).catch(err => done(err))

}))

module.exports = passport;