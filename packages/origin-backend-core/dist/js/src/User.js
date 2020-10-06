"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRole = exports.getRolesFromRights = exports.buildRights = exports.KYCStatus = exports.UserStatus = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["OrganizationAdmin"] = 1] = "OrganizationAdmin";
    Role[Role["OrganizationDeviceManager"] = 2] = "OrganizationDeviceManager";
    Role[Role["OrganizationUser"] = 4] = "OrganizationUser";
    Role[Role["Issuer"] = 8] = "Issuer";
    Role[Role["Admin"] = 16] = "Admin";
    Role[Role["SupportAgent"] = 32] = "SupportAgent";
})(Role = exports.Role || (exports.Role = {}));
var UserStatus;
(function (UserStatus) {
    UserStatus[UserStatus["Pending"] = 0] = "Pending";
    UserStatus[UserStatus["Active"] = 1] = "Active";
    UserStatus[UserStatus["Suspended"] = 2] = "Suspended";
    UserStatus[UserStatus["Deleted"] = 3] = "Deleted";
})(UserStatus = exports.UserStatus || (exports.UserStatus = {}));
var KYCStatus;
(function (KYCStatus) {
    KYCStatus[KYCStatus["Pending"] = 0] = "Pending";
    KYCStatus[KYCStatus["Passed"] = 1] = "Passed";
    KYCStatus[KYCStatus["Rejected"] = 2] = "Rejected";
})(KYCStatus = exports.KYCStatus || (exports.KYCStatus = {}));
function buildRights(roles) {
    if (!roles) {
        return 0;
    }
    return roles.reduce((a, b) => {
        return a | b;
    }, 0);
}
exports.buildRights = buildRights;
function getRolesFromRights(rights) {
    if (!rights) {
        return [];
    }
    const rolesKeys = Object.keys(Role);
    const roles = rolesKeys.splice(0, rolesKeys.length / 2).map((value) => Number(value));
    return roles.filter((role) => rights & role);
}
exports.getRolesFromRights = getRolesFromRights;
function isRole(user, ...roles) {
    return roles.some((role) => ((user === null || user === void 0 ? void 0 : user.rights) & role) !== 0);
}
exports.isRole = isRole;
//# sourceMappingURL=User.js.map