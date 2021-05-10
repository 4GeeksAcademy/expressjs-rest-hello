"use strict";
/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 *
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using
 * the POST /token endpoint
 *
 * Please include in this file all your private URL endpoints.
 *
 */
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
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions = __importStar(require("./actions"));
// declare a new router to include all the endpoints
var router = express_1.Router();
router.get('/user/me', utils_1.safe(actions.getMe));
router.get('/user', utils_1.safe(actions.getUsers));
router.get('/user/:id', utils_1.safe(actions.getUser));
router.put('/user/:id', utils_1.safe(actions.updateUser));
router["delete"]('/user/:id', utils_1.safe(actions.deleteUser));
// manage planets, this will all have to be implemented for characters as well
router.get('/planet', utils_1.safe(actions.getPlanets));
router.post('/planet', utils_1.safe(actions.createPlanet));
// this has to be implemented for characters as well
router.post('/favorite/planet/:planet_id', utils_1.safe(actions.addFavoritePlanet));
router["delete"]('/favorite/planet/:planet_id', utils_1.safe(actions.removeFavoritePlanet));
exports["default"] = router;
