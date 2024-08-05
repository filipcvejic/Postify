var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createUser, getUserByEmail, getUserById, } from "../models/userModel.js";
import { comparePasswords, hashPassword } from "../helpers/hashPassword.js";
import { throwError } from "../helpers/throwError.js";
export const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return throwError("Please provide valid credentials", 400);
        }
        const foundUser = yield getUserByEmail(email);
        if (!foundUser) {
            return throwError("User not found", 404);
        }
        const isPasswordValid = yield comparePasswords(password, foundUser.password);
        if (!isPasswordValid) {
            throwError("Invalid credentials", 401);
        }
        res.status(200).json({ user: foundUser });
    }
    catch (err) {
        next(err);
    }
});
export const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!email || !password || !username) {
            return throwError("Please provide valid credentials", 400);
        }
        const existingUser = yield getUserByEmail(email);
        if (existingUser) {
            return throwError("This user already exists", 409);
        }
        const hashedPassword = yield hashPassword(password);
        const user = yield createUser({
            email,
            username,
            password: hashedPassword,
        });
        return res.status(200).json(user);
    }
    catch (err) {
        next(err);
    }
});
export const sendFriendRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requestedUserId } = req.body;
        const foundRequestedUser = yield getUserById(requestedUserId);
        if (!foundRequestedUser) {
            return throwError("User you sent friend request is not found", 404);
        }
        const newRequest = yield createFriendRequest();
    }
    catch (err) {
        next(err);
    }
});
