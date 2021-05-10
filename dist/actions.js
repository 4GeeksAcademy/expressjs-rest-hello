"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteUser = exports.updateUser = exports.removeFavoritePlanet = exports.addFavoritePlanet = exports.createPlanet = exports.getMe = exports.getUser = exports.getPlanets = exports.getUsers = exports.createUser = exports.createToken = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var Planet_1 = require("./entities/Planet");
var utils_1 = require("./utils");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var createToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)
                    // We need to validate that a user with this email and password exists in the DB
                ];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY);
                // return the user and the recently created token to the client
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.createToken = createToken;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id, { relations: ["planets"] })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found", 404);
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUser = getUser;
var getMe = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // Notice that the user IS NOT coming from the DB, the user object was decoded from the token
        // you can retrive the current user on any privite endpoint by typing "req.user"
        console.log("This is the logged in user calling this endpoint", req.user);
        //                  ⬇ not comming from the BD
        return [2 /*return*/, res.json(req.user)];
    });
}); };
exports.getMe = getMe;
var createPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetRepo, planet, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide the planet name");
                planetRepo = typeorm_1.getRepository(Planet_1.Planet);
                planet = planetRepo.create(req.body);
                return [4 /*yield*/, planetRepo.save(planet)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.createPlanet = createPlanet;
var addFavoritePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet_id, user_id, usersRepo, user, planetRepo, planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planet_id = parseInt(req.params.planet_id);
                /**
                 * We can guess the current user from the authentication, more information about that here:
                 * get-the-authenticated-user
                */
                if (!req.user)
                    throw new utils_1.Exception("No user was found on the session token");
                user_id = req.user.id;
                usersRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, usersRepo.findOne(user_id, { relations: ["planets"] })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Authenticated user with id " + user_id + " not found", 404);
                planetRepo = typeorm_1.getRepository(Planet_1.Planet);
                return [4 /*yield*/, planetRepo.findOne(planet_id)];
            case 2:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Planet with id " + planet_id + " not found", 404);
                if (user.planets.find(function (p) { return p.id === planet_id; }))
                    throw new utils_1.Exception("The user already has this planet as favorite");
                user.planets = user.planets.concat(planet);
                return [4 /*yield*/, usersRepo.save(user)];
            case 3:
                _a.sent(); //Grabo el nuevo usuario 
                return [2 /*return*/, res.json(user.planets)];
        }
    });
}); };
exports.addFavoritePlanet = addFavoritePlanet;
var removeFavoritePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet_id, user_id, usersRepo, user, planetRepo, planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planet_id = parseInt(req.params.planet_id);
                /**
                 * We can guess the current user from the authentication, more information about that here:
                 * get-the-authenticated-user
                */
                if (!req.user)
                    throw new utils_1.Exception("No user was found on the session token");
                user_id = req.user.id;
                usersRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, usersRepo.findOne(user_id, { relations: ["planets"] })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Authenticated user with id " + user_id + " not found", 404);
                planetRepo = typeorm_1.getRepository(Planet_1.Planet);
                return [4 /*yield*/, planetRepo.findOne(planet_id)];
            case 2:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Planet with id " + planet_id + " not found", 404);
                // only keep each user planet if the given planet does not exist or if
                // given planet.id is different form the user's planet's id's
                user.planets = user.planets.filter(function (p) { return !planet || p.id != planet.id; });
                return [4 /*yield*/, usersRepo.save(user)];
            case 3:
                _a.sent(); //Grabo el nuevo usuario 
                return [2 /*return*/, res.json(user.planets)];
        }
    });
}); };
exports.removeFavoritePlanet = removeFavoritePlanet;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "Not Users found" })];
                typeorm_1.getRepository(Users_1.Users).merge(user, req.body); // Hace un merge de los datos existentes con los que se reciben a través de body
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)["delete"](req.params.id)];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.deleteUser = deleteUser;
