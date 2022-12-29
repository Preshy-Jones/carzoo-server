"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const env = require("dotenv");
env.config({ path: path_1.default.join(__dirname, "../.env") });
const config = {
    env: {
        isProduction: process.env.NODE_ENV === "production",
        isDevelopment: process.env.NODE_ENV === "development",
        isTest: process.env.NODE_ENV === "test",
    },
};
module.exports = config;
