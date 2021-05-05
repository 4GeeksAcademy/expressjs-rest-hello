"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "firstname");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "lastname");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], User.prototype, "email_validated");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
