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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
const express_1 = __importDefault(require("express"));
const resolver_1 = require("entity/User/resolver");
const resolver_2 = require("entity/Movie/resolver");
const initializeDB_1 = __importDefault(require("entity/initializeDB"));
const app = express_1.default();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield initializeDB_1.default();
        const schema = yield type_graphql_1.buildSchema({
            resolvers: [resolver_2.MovieResolver, resolver_1.UserResolver],
            container: typedi_1.Container,
            emitSchemaFile: true,
        });
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            introspection: true,
        });
        yield server.start();
        server.applyMiddleware({ app });
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Server is running on http://localhost:${port}/graphql`));
    });
}
main();
//# sourceMappingURL=index.js.map