"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("express-async-errors"); //must always be the first, ideal for error handling
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var utils_1 = require("./utils");
var private_routes_1 = __importDefault(require("./private_routes"));
var public_routes_1 = __importDefault(require("./public_routes"));
var express_jwt_1 = __importDefault(require("express-jwt"));
var PORT = 3001;
var PUBLIC_URL = utils_1.url(PORT);
var app = express_1["default"]();
// create a database connection based on the ./ormconfig.js file
var connectionPromess = typeorm_1.createConnection();
/*
Middlewares: every time you see "app.use" we are including a new
middleware to the express server, you can read more about middle wares here:
https://developer.okta.com/blog/2018/09/13/build-and-understand-express-middleware-through-examples
*/
app.use(cors_1["default"]()); //disable CORS validations
app.use(express_1["default"].json()); // the API will be JSON based for serialization
app.use(morgan_1["default"]('dev')); //logging
// render home website with usefull information for boilerplate developers (students)
app.get('/', function (req, res) { return utils_1.renderIndex(app, PUBLIC_URL).then(function (html) { return res.status(404).send(html); }); });
// Import public routes from ./src/public_routes.ts file
// this line has to be ABOVE the JWT middleware to avoid
// the jwt middleware to influence these enpoints
app.use(public_routes_1["default"]);
// add two middlewars to handle request with JWT token
var opt = { secret: process.env.JWT_KEY, algorithms: ["HS256"] };
app.use(express_jwt_1["default"](opt)); // ⬅ JWT Middleware
app.use((function (err, req, res, next) {
    if (err)
        console.error(err);
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: err.message }); // ⬅ Force the 401 status
    }
    next();
}));
// Import private routes from ./src/private_routes.ts file
// this line has to be BELOW the JWT middleware to enforce
// all these routes to be private
app.use(private_routes_1["default"]);
// default empty route for 404
app.use(function (req, res) { return res.status(404).json({ "message": "Not found" }); });
// start the express server, listen to requests on PORT
app.listen(PORT, function () {
    return console.info("==> \uD83D\uDE0E Listening on port " + PORT + ".\n   Open " + PUBLIC_URL + " in your browser.");
});
