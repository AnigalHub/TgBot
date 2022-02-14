"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var config_json_1 = __importDefault(require("../config.json"));
var pool = new pg_1.Pool(config_json_1.default.dbConnection);
exports.default = pool;
//# sourceMappingURL=index.js.map