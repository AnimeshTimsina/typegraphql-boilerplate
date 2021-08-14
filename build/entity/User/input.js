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
exports.CreateUserInput = void 0;
const class_validator_1 = require("class-validator");
const interface_1 = require("shared/types/interface");
const type_graphql_1 = require("type-graphql");
let CreateUserInput = class CreateUserInput {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(2, 50),
    __metadata("design:type", String)
], CreateUserInput.prototype, "firstName", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(2, 50),
    __metadata("design:type", String)
], CreateUserInput.prototype, "lastName", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(5, 150),
    __metadata("design:type", String)
], CreateUserInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.Length(8, 150),
    __metadata("design:type", String)
], CreateUserInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(_ => interface_1.USER_ROLE),
    __metadata("design:type", String)
], CreateUserInput.prototype, "role", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateUserInput.prototype, "displayPicture", void 0);
CreateUserInput = __decorate([
    type_graphql_1.InputType()
], CreateUserInput);
exports.CreateUserInput = CreateUserInput;
//# sourceMappingURL=input.js.map