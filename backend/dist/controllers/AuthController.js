"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.register = void 0;
const hashPassword_1 = require("../utils/hashPassword");
const comparePassword_1 = require("../utils/comparePassword");
const Users_1 = require("../models/Users");
const authDataValidation_1 = require("../utils/authDataValidation");
const isRegisteredEmail_1 = require("../utils/isRegisteredEmail");
const isNameRegistered_1 = require("../utils/isNameRegistered");
const createToken_1 = require("../utils/createToken");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, name, password } = req.body;
        const hashedPassword = yield (0, hashPassword_1.hashPassword)(password);
        const isPasswordAlreadyUsed = yield (0, comparePassword_1.isPasswordAlreadyTaken)(password);
        const isEmailUsed = yield (0, comparePassword_1.isEmailAlreadyUsed)(email);
        const validationResult = yield (0, authDataValidation_1.registercredentialValidation)(name, email, password);
        if (validationResult.error) {
            // Handle validation error
            return res.json({ ValidationError: validationResult.error.message });
        }
        // console.log(isPasswordAlreadyUsed, isEmailUsed, hashedPassword);
        if (isPasswordAlreadyUsed === false && isEmailUsed === false) {
            const newUser = yield Users_1.UserModel.insertMany({
                name: name,
                email: email,
                password: hashedPassword,
            });
        }
        //secure:true, httpOnly:true
        return res.status(201).json({
            message: "New user created",
        });
        // const user = await newUser().save();
    }
    catch (error) {
        return res.json({ error: error.message });
    }
});
exports.register = register;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        const validationResult = yield (0, authDataValidation_1.registercredentialValidation)(name, email, "Password@123");
        if (validationResult.error) {
            // Handle validation error
            console.log("validation error");
            return res.json({ ValidationError: validationResult.error.message });
        }
        const new_Email = yield (0, isRegisteredEmail_1.isRegisteredEmail)(email);
        if (new_Email === false) {
            console.log("The email is not yet registered");
            return res.json({
                error: true,
                message: "The email is not yet registered",
            });
        }
        const checkNameAlreadyReistered = yield (0, isNameRegistered_1.isNameAlreadyReqistered)(name);
        if (checkNameAlreadyReistered === false) {
            console.log("The name is not yet registered");
            return res.json({
                error: true,
                message: "The name is not yet registered",
            });
        }
        const token = yield (0, createToken_1.createToken)(email);
        res.cookie("token", token);
        return res.json({
            success: true,
            message: "login successful",
        });
    }
    catch (error) {
        return res.json({
            error: true,
            message: error.message,
        });
    }
});
exports.loginController = loginController;
//# sourceMappingURL=AuthController.js.map