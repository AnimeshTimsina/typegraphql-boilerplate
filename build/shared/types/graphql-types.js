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
exports.BoolResponse = exports.DeleteResponse = void 0;
const type_graphql_1 = require("type-graphql");
let DeleteResponse = class DeleteResponse {
};
__decorate([
    type_graphql_1.Field((_) => type_graphql_1.ID),
    __metadata("design:type", String)
], DeleteResponse.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field((_) => Boolean),
    __metadata("design:type", Boolean)
], DeleteResponse.prototype, "success", void 0);
DeleteResponse = __decorate([
    type_graphql_1.ObjectType()
], DeleteResponse);
exports.DeleteResponse = DeleteResponse;
let BoolResponse = class BoolResponse {
};
__decorate([
    type_graphql_1.Field((_) => Boolean),
    __metadata("design:type", Boolean)
], BoolResponse.prototype, "ok", void 0);
BoolResponse = __decorate([
    type_graphql_1.ObjectType()
], BoolResponse);
exports.BoolResponse = BoolResponse;
//# sourceMappingURL=graphql-types.js.map