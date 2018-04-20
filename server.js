const express = require('express');
const path = require('path')
const session = require('express-session')

const routes = {
    vendors: require('./routes/vendor'),
    products: require('./routes/products'),
    cart: require('./routes/cart'),
    user: require('./routes/user')
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'k3rn@l$h3LL', cookie: {maxAge: 60000}}))

app.use('/vendors', routes.vendors);
app.use('/products', routes.products);
app.use('/cart', routes.cart);
app.use('/user', routes.user);

app.get('/viewcart', (req, res) => {
    res.sendFile('public/viewcart.html', {root: __dirname})
})

app.get('/addproduct', (req, res) => {
    res.sendFile('public/addproduct.html', {root: __dirname})

})

app.listen(5555, () => {
    console.log("Server started @ 5555");
})