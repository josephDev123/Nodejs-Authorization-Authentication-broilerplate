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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoute_1 = require("./routes/authRoute");
dotenv_1.default.config();
const corsOption = {
    origin: "http://localhost:5173",
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.dbConnection)();
        app.listen(process.env.PORT, () => {
            console.log(`listening on port ${process.env.PORT}`);
        });
        app.use("/auth", authRoute_1.AuthRoute);
        app.get("/test", (req, res) => {
            res.cookie("refresh_token", "hello", {
                secure: true,
                httpOnly: true,
            });
            return res.send("hello");
        });
    }
    catch (error) {
        console.log(error);
    }
});
startApp();
//# sourceMappingURL=index.js.map