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
exports.login = exports.createUser = void 0;
const userData_1 = __importDefault(require("../Model/userData")); // Ensure that userModel is exported as a default export in the userData model
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import ErrorWithStatus from "../../types/global";
// Type definitions for environment variables
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        };
        console.log(user);
        const hashedPassword = yield bcrypt_1.default.hash(user.password, SALT_ROUNDS);
        user.password = hashedPassword;
        const userToSave = new userData_1.default(user);
        yield userToSave.save();
        res.status(200).json({ message: `User ${user.name} saved` });
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const jwtPassword = process.env.JWT_SECRET || "default_jwt_secret";
        const user = yield userData_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Password is invalid" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, jwtPassword, {
            expiresIn: "1h",
        });
        res.status(200).json({
            message: "Login successful",
            token,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
