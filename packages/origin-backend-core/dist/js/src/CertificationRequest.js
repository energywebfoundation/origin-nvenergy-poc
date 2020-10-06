"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_ENERGY_PER_CERTIFICATE = void 0;
const ethers_1 = require("ethers");
// Maximum number Solidity can handle is (2^256)-1
exports.MAX_ENERGY_PER_CERTIFICATE = ethers_1.BigNumber.from(2).pow(256).sub(1);
//# sourceMappingURL=CertificationRequest.js.map