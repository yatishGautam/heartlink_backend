"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Controller_1 = require("../Profile/Controller");
const authentication_1 = __importDefault(require("../Middlewares/authentication"));
const router = express_1.default.Router();
/* GET users listing. */
router.get("/getprofiledata", (req, res, next) => {
    (0, authentication_1.default)(req, res, next);
    (0, Controller_1.getProfileData)(req, res, next);
});
router.post("/updateprofiledata", (req, res, next) => {
    (0, authentication_1.default)(req, res, next);
    (0, Controller_1.updateProfileData)(req, res, next);
});
exports.default = router;
