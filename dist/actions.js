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
exports.deleteUser = exports.updateUser = exports.createPlanet = exports.addToFavorite = exports.createUser = exports.getUser = exports.getPlanets = exports.getUsers = exports.login = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var User_1 = require("./entities/User");
var Planet_1 = require("./entities/Planet");
var utils_1 = require("./utils");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, password, userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                email = req.body.email;
                password = req.body.password;
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User)];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ email: email, password: password })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY);
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
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
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id, { relations: ["planets"] })];
            case 1:
                user = _a.sent();
                if (user)
                    console.log("users", user);
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUser = getUser;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                newUser = typeorm_1.getRepository(User_1.User).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var addToFavorite = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planetId, users, planetRepo, planet, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                planetId = req.params.id;
                users = req.body.users;
                delete req.body['users'];
                planetRepo = typeorm_1.getRepository(Planet_1.Planet);
                planet = planetRepo.create(req.body);
                //add users from the req.body
                planet.users = users;
                return [4 /*yield*/, planetRepo.save(planet)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.addToFavorite = addToFavorite;
var createPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, planetRepo, planet, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a firs_tname");
                if (!req.body.users)
                    throw new utils_1.Exception("Please provide a the planet users");
                users = req.body.users;
                delete req.body['users'];
                planetRepo = typeorm_1.getRepository(Planet_1.Planet);
                planet = planetRepo.create(req.body);
                //add users from the req.body
                planet.users = users;
                return [4 /*yield*/, planetRepo.save(planet)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.createPlanet = createPlanet;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    return [2 /*return*/, res.status(404).json({ message: "Not User found" })];
                typeorm_1.getRepository(User_1.User).merge(user, req.body); // Hace un merge de los datos existentes con los que se reciben a través de body
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(user)];
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
            case 0: return [4 /*yield*/, typeorm_1.getRepository(User_1.User)["delete"](req.params.id)];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.deleteUser = deleteUser;
