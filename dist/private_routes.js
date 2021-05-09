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
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
// declare a new router to include all the endpoints
var router = express_1.Router();
router.get('/user/me', utils_1.safe(actions_1.getMe));
router.get('/user', utils_1.safe(actions_1.getUsers));
router.get('/planet', utils_1.safe(actions_1.getPlanets));
router.get('/user/:id', actions_1.getUser);
router.post('/planet', utils_1.safe(actions_1.createPlanet));
router.put('/user/:id', actions_1.updateUser);
router["delete"]('/user/:id', actions_1.deleteUser);
exports["default"] = router;
