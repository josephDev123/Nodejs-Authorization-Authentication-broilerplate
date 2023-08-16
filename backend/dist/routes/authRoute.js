"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoute = void 0;
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
exports.AuthRoute = (0, express_1.Router)();
exports.AuthRoute.post("/register", AuthController_1.register);
//# sourceMappingURL=authRoute.js.map