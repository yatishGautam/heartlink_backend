var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import userModel from "../Model/userData";
const bcCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const jwtPassword = process.env.JWT_SECRET;
// @desc    Create a new user
// @route   POST /api/users
// @access  Public
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
        };
        const hashedPassword = yield bcCrypt.hash(user.password, Number(SALT_ROUNDS));
        user.password = hashedPassword;
        const userToSave = new userModel(user);
        yield userToSave.save();
        res.status(200).json({ message: `user ${user.name} saved` });
    }
    catch (error) {
        next(error);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }
        const isPasswordValid = yield bcCrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "password is invalid" });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, jwtPassword, {
            expiresIn: "1h",
        });
        res.status(200).json({
            message: "login successful",
            token,
        });
    }
    catch (error) {
        console.log("error in login:: ", error);
        next(error);
    }
});
module.exports = { createUser, login };
