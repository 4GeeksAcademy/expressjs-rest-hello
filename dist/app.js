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
var routes_1 = __importDefault(require("./routes"));
var jwt_express_1 = __importDefault(require("jwt-express"));
var PORT = 3001;
var PUBLIC_URL = utils_1.url(PORT);
var app = express_1["default"]();
// create a database connection based on the ./ormconfig.js file
var connectionPromess = typeorm_1.createConnection();
// Middlewares
app.use(cors_1["default"]()); //disable CORS validations
app.use(express_1["default"].json()); // the API will be JSON based for serialization
app.use(morgan_1["default"]('dev')); //logging
// add two middlewars to handle request with JWT token
app.use(jwt_express_1["default"].init('secret'));
app.use((function (err, req, res, next) {
    if (err)
        console.error(err);
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ status: 'invalid token' });
    }
    next();
}));
// Import routes from ./src/routes.ts file
app.use(routes_1["default"]);
// render home website with usefull information for students
app.get('/', function (req, res) { return res.status(404).send(utils_1.renderRoutes(app, PUBLIC_URL)); });
// default empty route for 404
app.use(function (req, res) { return res.status(404).json({ "message": "Not found" }); });
// start the express server, listen to requests on PORT
app.listen(PORT, function () {
    return console.info("==> \uD83D\uDE0E Listening on port " + PORT + ".\n\tOpen " + PUBLIC_URL + " in your browser.");
});
