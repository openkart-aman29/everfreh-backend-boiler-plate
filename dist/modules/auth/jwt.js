"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../../config/logger");
const privateKey = fs_1.default.readFileSync(path_1.default.resolve(process.env.JWT_PRIVATE_KEY_PATH), 'utf8');
const publicKey = fs_1.default.readFileSync(path_1.default.resolve(process.env.JWT_PUBLIC_KEY_PATH), 'utf8');
const signToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1h' });
};
exports.signToken = signToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, publicKey, { algorithms: ['RS256'] });
    }
    catch (error) {
        logger_1.logger.error('JWT verification failed', error);
        throw error;
    }
};
exports.verifyToken = verifyToken;
