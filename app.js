const express = require('express');
const debug = require('debug')('app');
const chalk = require('chalk');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(express.static(path.join(__dirname, '/public/')));
//app.use(express.static(path.join(__dirname, 'src/views/'), {index: 'login.html'}));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session(
    {secret:'store', 
    resave: true,
    saveUninitialized: true}));

require('./src/config/passport.js')(app);


const productsRouter = require('./src/routers/productsRouter');
const authRouter = require('./src/routers/authRouter');
const exp = require('constants');
const port = process.env.PORT;



app.use('/products', productsRouter);
app.use('/auth', authRouter);


app.set('views', './src/views');
app.set('view engine', 'ejs');

app.listen(port, () =>{
    debug(`listening on port ${chalk.green(port)}`);
});

app.get('/', (req, res) => {
    res.render('home', {"title" : "Store"});
});