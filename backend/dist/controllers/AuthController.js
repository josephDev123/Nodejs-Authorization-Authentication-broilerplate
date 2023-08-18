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
exports.register = void 0;
const hashPassword_1 = require("../utils/hashPassword");
const comparePassword_1 = require("../utils/comparePassword");
const Users_1 = require("../models/Users");
const authDataValidation_1 = require("../utils/authDataValidation");
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
//# sourceMappingURL=AuthController.js.map