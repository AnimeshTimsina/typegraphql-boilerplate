"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_ROLE = void 0;
const type_graphql_1 = require("type-graphql");
var USER_ROLE;
(function (USER_ROLE) {
    USER_ROLE["ADMIN"] = "ADMIN";
    USER_ROLE["CLIENT"] = "CLIENT";
    USER_ROLE["STAFF"] = "STAFF";
})(USER_ROLE = exports.USER_ROLE || (exports.USER_ROLE = {}));
type_graphql_1.registerEnumType(USER_ROLE, {
    name: "USER_ROLE",
    description: "Type of user",
});
//# sourceMappingURL=interface.js.map