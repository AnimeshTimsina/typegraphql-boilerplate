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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const intializeDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield typeorm_1.createConnection();
        console.log('Database successfully initialized');
    }
    catch (error) {
        console.log(`Database failed to connect ${error.message}`);
    }
});
exports.default = intializeDB;
//# sourceMappingURL=initializeDB.js.map