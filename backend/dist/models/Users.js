"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//user schema
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        maxlength: 30,
        minlength: 2,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
});
//user model
exports.UserModel = mongoose_1.default.model("User", userSchema);
//# sourceMappingURL=Users.js.map