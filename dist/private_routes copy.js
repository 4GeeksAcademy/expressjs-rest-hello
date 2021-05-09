"use strict";
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var router = express_1.Router();
// login route (generates a token if valid email & pass)
// router.post('/token', safe(createToken));
// router.post('/user', safe(createUser));
router.post('/user', utils_1.safe(actions_1.createUser));
// router.get('/user', safe(getUsers));
router.get('/planet', utils_1.safe(actions_1.getPlanets));
router.get('/user/:id', actions_1.getUser);
router.post('/planet', utils_1.safe(actions_1.createPlanet));
router.put('/user/:id', actions_1.updateUser);
router["delete"]('/user/:id', actions_1.deleteUser);
exports["default"] = router;
