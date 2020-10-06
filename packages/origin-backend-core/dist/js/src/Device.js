"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortLowestToHighestTimestamp = exports.DeviceStatus = void 0;
var DeviceStatus;
(function (DeviceStatus) {
    DeviceStatus[DeviceStatus["Submitted"] = 0] = "Submitted";
    DeviceStatus[DeviceStatus["Denied"] = 1] = "Denied";
    DeviceStatus[DeviceStatus["Active"] = 2] = "Active";
})(DeviceStatus = exports.DeviceStatus || (exports.DeviceStatus = {}));
exports.sortLowestToHighestTimestamp = (a, b) => {
    if (a.timestamp > b.timestamp)
        return 1;
    if (b.timestamp > a.timestamp)
        return -1;
    return 0;
};
//# sourceMappingURL=Device.js.map