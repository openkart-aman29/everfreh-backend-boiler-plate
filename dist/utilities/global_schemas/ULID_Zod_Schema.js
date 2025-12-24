"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ulidZodSchema = void 0;
const zod_1 = require("zod");
exports.ulidZodSchema = zod_1.z.string()
    .length(26, "ULID must be exactly 26 characters")
    .regex(/^[0-9A-HJKMNP-TV-Z]{26}$/i, "Invalid ULID format");
