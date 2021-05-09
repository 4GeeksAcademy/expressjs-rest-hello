"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.Exception = exports.safe = exports.renderIndex = exports.url = void 0;
var path = __importStar(require("path")); // node.js internal module usefull to get file paths
var express_list_endpoints_1 = __importDefault(require("express-list-endpoints")); //just a function that retrieves all the API routes
var ejs_1 = __importDefault(require("ejs")); //template engine
// We need to know what will be the API host
// in a local computer is always "localhost" 
// but in gitpod if varies depending on the workspace URL
var url = function (port) {
    var publicUrl = "http://localhost:" + port;
    // Gitpod has internal environment variables https://www.gitpod.io/docs/environment-variables/
    // the Workspace URL is one of them (thank God)
    if (process.env.GITPOD_WORKSPACE_URL) {
        var _a = process.env.GITPOD_WORKSPACE_URL.split('://'), schema = _a[0], host = _a[1];
        publicUrl = "https://" + port + "-" + host;
    }
    return publicUrl;
};
exports.url = url;
// this function creates the HTML/CSS for the API Index home page
var renderIndex = function (_app, url) { return __awaiter(void 0, void 0, void 0, function () {
    var routes, data;
    return __generator(this, function (_a) {
        routes = express_list_endpoints_1["default"](_app).map(function (item) {
            var endpoints = [];
            item.methods.forEach(function (e) {
                endpoints.push({ method: e, path: item.path });
            });
            return endpoints;
        }).flat()
            //remove the home page rout because its obvious
            .filter(function (r) { return r.path != "/"; });
        data = {
            host: url,
            routes: routes,
            rigo: "https://github.com/4GeeksAcademy/expressjs-rest-hello/blob/master/docs/assets/rigo-baby.jpeg?raw=true",
            starter: "https://start.4geeksacademy.com/starters/express"
        };
        return [2 /*return*/, new Promise(function (resolve, reject) {
                // use the EJS template engine to generate the HTML/CSS
                ejs_1["default"].renderFile(path.join(__dirname, "../docs/assets/template.ejs"), data, function (err, result) {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                });
            })];
    });
}); };
exports.renderIndex = renderIndex;
//.sort((a,b) => a.method > b.method)
var safe = function (fn) { return function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fnReturn, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fn(req, res)];
            case 1:
                fnReturn = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(err_1.status || 500);
                res.json({ message: err_1.message || err_1.msg || err_1 });
                next(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); }; };
exports.safe = safe;
var Exception = /** @class */ (function (_super) {
    __extends(Exception, _super);
    function Exception(msg, status) {
        if (status === void 0) { status = 400; }
        var _this = _super.call(this) || this;
        _this.status = 400;
        _this.status = status || 400;
        _this.message = msg;
        return _this;
    }
    return Exception;
}(Error));
exports.Exception = Exception;
