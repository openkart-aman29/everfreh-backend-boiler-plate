"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenVerificationMiddleware = void 0;
// TODO: Implement JWT verification middleware
const accessTokenVerificationMiddleware = (req, res, next) => {
    // For now, just pass through
    next();
};
exports.accessTokenVerificationMiddleware = accessTokenVerificationMiddleware;
