"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("reflect-metadata");
require("express-async-errors");
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var utils_1 = require("./utils");
var admin_1 = __importDefault(require("./admin"));
var routes_1 = __importDefault(require("./routes"));
var PORT = 3001;
var PUBLIC_URL = utils_1.url(PORT);
var app = express_1["default"]();
// create a database connection based on the ./ormconfig.js file
var connectionPromess = typeorm_1.createConnection();
// Middlewares
app.use(cors_1["default"]()); //disable CORS validations
app.use(express_1["default"].json()); // the API will be JSON based for serialization
app.use(morgan_1["default"]('dev')); //logging
// Import routes from ./src/routes.ts file
app.use(routes_1["default"]);
// render home website with usefull information for students
app.get('/', function (req, res) { return res.status(404).send(utils_1.renderRoutes(app, PUBLIC_URL)); });
// add admin interface for database administration
admin_1["default"]('/admin')
    .then(function (router) {
    // add all admin routes like /admin, 
    app.use('/admin', router);
    // default empty route for 404
    app.use(function (req, res) { return res.status(404).json({ "message": "Not found" }); });
});
// start the express server, listen to requests on PORT
app.listen(PORT, function () {
    return console.info("==> \uD83D\uDE0E Listening on port " + PORT + ".\n\tOpen " + PUBLIC_URL + " in your browser.");
});
