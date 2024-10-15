"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthenticaitonController_1 = require("../Authentication/Controller/AuthenticaitonController");
const router = express_1.default.Router();
router.post("/signup", (req, res, next) => {
    try {
        (0, AuthenticaitonController_1.createUser)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.post("/login", (req, res, next) => {
    try {
        (0, AuthenticaitonController_1.login)(req, res, next);
    }
    catch (error) {
        next(error);
    }
});
router.post("/logout", (req, res) => {
    // logout method
    res.send();
});
exports.default = router;
