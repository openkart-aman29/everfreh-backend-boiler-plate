"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateULID = void 0;
const ulid_1 = require("ulid");
const generateULID = () => {
    return (0, ulid_1.ulid)();
};
exports.generateULID = generateULID;
