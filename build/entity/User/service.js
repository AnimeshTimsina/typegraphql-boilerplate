"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typedi_1 = require("typedi");
const model_1 = require("./model");
const bcrypt_1 = require("bcrypt");
const interface_1 = require("../../shared/types/interface");
let UserService = class UserService {
    constructor() {
        this.getAll = () => __awaiter(this, void 0, void 0, function* () {
            return yield model_1.User.find();
        });
        this.getOne = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.User.findOne({ where: { id } });
            return user;
        });
        this.getByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield model_1.User.findOne({ where: { email } });
            return user;
        });
        this.create = (createUserInput) => __awaiter(this, void 0, void 0, function* () {
            return yield model_1.User.create(Object.assign(Object.assign({}, createUserInput), { password: yield bcrypt_1.hash(createUserInput.password, 12) })).save();
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield model_1.User.delete({
                    id: id
                });
                return {
                    id: id,
                    success: true
                };
            }
            catch (err) {
                return {
                    id: null,
                    success: false
                };
            }
        });
        this.update = (id, updateUserInput) => __awaiter(this, void 0, void 0, function* () {
            const userFound = yield model_1.User.findOne({ where: { id } });
            if (!userFound) {
                throw new Error(`The user with id: ${id} does not exist!`);
            }
            Object.assign(userFound, updateUserInput);
            const updatedUser = yield userFound.save();
            return updatedUser;
        });
        this.incrementTokenNumber = (user) => {
            user.tokenVersion = user.tokenVersion + 1;
            user.save();
        };
        this.isAdmin = (user) => {
            return user.role === interface_1.USER_ROLE.ADMIN;
        };
        this.isClient = (user) => {
            return user.role === interface_1.USER_ROLE.CLIENT;
        };
        this.isStaff = (user) => {
            return user.role === interface_1.USER_ROLE.STAFF;
        };
    }
};
UserService = __decorate([
    typedi_1.Service()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=service.js.map