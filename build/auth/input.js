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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordInput = exports.ChangePasswordInput = exports.GetNewTokenInput = exports.LoginInput = void 0;
const class_validator_1 = require("class-validator");
const type_graphql_1 = require("type-graphql");
let LoginInput = class LoginInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], LoginInput.prototype, "password", void 0);
LoginInput = __decorate([
    type_graphql_1.InputType()
], LoginInput);
exports.LoginInput = LoginInput;
let GetNewTokenInput = class GetNewTokenInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], GetNewTokenInput.prototype, "refreshToken", void 0);
GetNewTokenInput = __decorate([
    type_graphql_1.InputType()
], GetNewTokenInput);
exports.GetNewTokenInput = GetNewTokenInput;
let ChangePasswordInput = class ChangePasswordInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "currentPassword", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(8, 150),
    __metadata("design:type", String)
], ChangePasswordInput.prototype, "newPassword", void 0);
ChangePasswordInput = __decorate([
    type_graphql_1.InputType()
], ChangePasswordInput);
exports.ChangePasswordInput = ChangePasswordInput;
let ResetPasswordInput = class ResetPasswordInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], ResetPasswordInput.prototype, "token", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(8, 150),
    __metadata("design:type", String)
], ResetPasswordInput.prototype, "newPassword", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(8, 150),
    __metadata("design:type", String)
], ResetPasswordInput.prototype, "confirmNewPassword", void 0);
ResetPasswordInput = __decorate([
    type_graphql_1.InputType()
], ResetPasswordInput);
exports.ResetPasswordInput = ResetPasswordInput;
//# sourceMappingURL=input.js.map