require( 'dotenv' ).config();
const express = require( 'express' );
const session = require( 'express-session' );
const bodyParser = require( 'body-parser' );

//middleware
const checkForSession = require( './middlewares/checkForSession' );

//controllers
const swag_controller = require( './controllers/swag_controller' );
const auth_controller = require( './controllers/auth_controller' );
const cart_controller = require( './controllers/cart_controller' );
const search_controller = require( './controllers/search_controller' );

const app = express();

app.use( bodyParser.json() );
app.use( session ({
    secret: 'party',
    resave: false,
    saveUninitialized: true
}));
app.use( checkForSession );
app.use( express.static( `${__dirname}/build`));

// swag
app.get( '/api/swag', swag_controller.read );

// auth
app.post( '/api/login', auth_controller.login );
app.post( '/api/register', auth_controller.register );
app.post( '/api/signout', auth_controller.signout );
app.get( '/api/user', auth_controller.getUser );

// cart
app.post( '/api/cart', cart_controller.add );
app.post( '/api/cart/checkout', cart_controller.checkout );
app.delete( '/api/cart', cart_controller.delete );

// search
app.get( '/api/search', search_controller.search );


const port = 3000;

app.listen(port, ()=> {
    console.log(`You're listening to SaltyBoi on the ones and twos of PowerLvL${port} radio`);
});