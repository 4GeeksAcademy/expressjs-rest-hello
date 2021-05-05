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
var dotenv_1 = __importDefault(require("dotenv"));
var routes_1 = __importDefault(require("./routes"));
dotenv_1["default"].config(); // load .env variables
var PORT = 3001;
var PUBLIC_URL = utils_1.url(PORT);
var app = express_1["default"]();
var connection = typeorm_1.createConnection();
// Middlewares
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use(morgan_1["default"]('dev'));
// Routes
app.use(routes_1["default"]);
app.get('/', function (req, res) {
    res.status(404).send(utils_1.renderRoutes(app, PUBLIC_URL));
});
app.use(function (req, res) {
    res.status(404).json({ "message": "Not found" });
});
app.listen(PORT, function () {
    return console.info("==> \uD83D\uDE0E Listening on port " + PORT + ".\n\tOpen " + PUBLIC_URL + " in your browser.");
});
