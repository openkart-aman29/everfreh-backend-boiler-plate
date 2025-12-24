"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = sendResponse;
function sendResponse(res, responseData) {
    return res.status(responseData.status).json(responseData);
}
