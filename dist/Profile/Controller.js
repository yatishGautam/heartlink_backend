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
exports.updateProfileData = exports.getProfileData = void 0;
const UserProfile_1 = __importDefault(require("./Model/UserProfile"));
// Controller to get user profile data
const getProfileData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const userProfile = yield UserProfile_1.default.findOne({ userId });
        if (!userProfile) {
            return res.status(404).json({ message: "User profile not found" });
        }
        res.status(200).json(userProfile);
    }
    catch (error) {
        next(error);
    }
});
exports.getProfileData = getProfileData;
// Controller to update user profile data
const updateProfileData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("are we here ", (_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
    try {
        const userId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.id;
        const { bio, name, relationshipStatus } = req.body;
        if (!userId) {
            const error = {
                status: 404,
                errors: "bad user",
                name: "updateProfileData",
                message: "bad user",
            };
            next(error);
        }
        // Find the profile and update it
        const updatedProfile = yield UserProfile_1.default.findOneAndUpdate({ userId }, { bio, name, relationshipStatus }, { new: true, runValidators: true } // `new: true` returns the updated document
        );
        if (!updatedProfile) {
            // return res.status(404).json({ message: "User profile not found" });
        }
        res.status(200).json(updatedProfile);
    }
    catch (error) {
        next(error);
    }
});
exports.updateProfileData = updateProfileData;
