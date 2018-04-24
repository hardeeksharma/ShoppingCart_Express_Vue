const express = require('express');
const path = require('path')
const session = require('express-session')
const passport = require('./passport')
const app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const routes = {
    vendors: require('./routes/vendor'),
    products: require('./routes/products'),
    cart: require('./routes/cart'),
    user: require('./routes/user')
}

app.use(session({
    secret: 'X8suo(%;~>e~dlhrnKK|Gaqm7D/p?i!%KBeu-u|Nd,^2~S*AyI 6[B8?awlUEBnH',
    cookie: {maxAge: 60000},
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'k3rn@l$h3LL', cookie: {maxAge: 60000}}))

app.use('/vendors', routes.vendors);
app.use('/products', routes.products);
app.use('/cart', routes.cart);
app.use('/user', routes.user);

app.get('/', (req, res) => {
    res.sendFile('public/home.html', {root: __dirname})
})

app.get('/viewcart', (req, res) => {
    if (!req.user)
        res.redirect("/login");
    else
        res.sendFile('public/viewcart.html', {root: __dirname})
})

app.get('/addproduct', (req, res) => {
    res.sendFile('public/addproduct.html', {root: __dirname})
})
app.get('/login', (req, res) => {
    res.sendFile('public/login.html', {root: __dirname})
})

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/'
}))

app.get('/logout', (req, res) => {
    if(req.user){
        req.logout();

        res.clearCookie("connect.sid");
        req.session.destroy();
        res.redirect("/");
    }
    else
        res.redirect('/');
})

app.listen(5555, () => {
    console.log("Server started @ 5555");
})