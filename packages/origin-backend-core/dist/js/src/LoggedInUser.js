"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggedInUser = void 0;
const User_1 = require("./User");
class LoggedInUser {
    constructor(user) {
        var _a;
        this.id = user.id;
        this.organizationId = (_a = user.organization) === null || _a === void 0 ? void 0 : _a.id;
        this.email = user.email;
        this.blockchainAccountAddress = user.blockchainAccountAddress;
        this.rights = user.rights;
    }
    hasRole(...role) {
        return User_1.isRole(this, ...role);
    }
    get ownerId() {
        return (this.organizationId || this.id).toString();
    }
}
exports.LoggedInUser = LoggedInUser;
//# sourceMappingURL=LoggedInUser.js.map