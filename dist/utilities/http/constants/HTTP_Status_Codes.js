"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorStatus = void 0;
const getErrorStatus = (status) => {
    switch (status) {
        case 400: return 'BAD_REQUEST';
        case 401: return 'UNAUTHORIZED';
        case 403: return 'FORBIDDEN';
        case 404: return 'NOT_FOUND';
        case 409: return 'CONFLICT';
        case 422: return 'UNPROCESSABLE_ENTITY';
        case 500: return 'INTERNAL_SERVER_ERROR';
        default: return 'UNKNOWN_ERROR';
    }
};
exports.getErrorStatus = getErrorStatus;
