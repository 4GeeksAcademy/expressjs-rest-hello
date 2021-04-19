"use strict";
// const express = require('express');
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
// import cors = require('cors');
var cors = __importStar(require("cors"));
// let app = express();
var app = express.Router();
// const compression = require('compression');
// const {logGenerate} = require('./midlewares/log.midleware');
// const isDeveloping = process.env.NODE_ENV !== 'production';
// const port = isDeveloping ? 1338 : process.env.PORT;
var PORT = 1338;
var API_URL = 'http://0.0.0.0:1338';
// app.use('*', cors());
var options = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: API_URL,
    preflightContinue: false,
};
//use cors middleware
app.use(cors(options));
//enable pre-flight
router.options('*', cors(options));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(morgan("dev"));
app.get('/', function (req, res) {
    res.send('Hello World!');
});
//MIDLEWARES
// app.use( logGenerate );
//ROUTES
// app.use(require('./routes/index'))
// app.use( (req, res) => {
//     res.status(404).json({ "message": "Página no encontrada" });
// })
app.listen(PORT, '0.0.0.0', function (err) {
    if (err) {
        return console.log(err);
    }
    return console.info("==> \uD83D\uDE0E Listening on port " + PORT + ".\n        Open http://0.0.0.0:" + PORT + "/ in your browser.");
});
