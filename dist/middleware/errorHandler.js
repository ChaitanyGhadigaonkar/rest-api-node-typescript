"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const errorHandler = (err, req, res, next) => {
    res.status(500).send({
        message: err.message,
        stack: config_1.NODE_ENV === "dev" ? err.stack : null,
    });
};
exports.default = errorHandler;
