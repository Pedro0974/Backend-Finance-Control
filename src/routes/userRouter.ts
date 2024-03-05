import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserData } from "../data/UserData";

export const userRouter = express.Router();

const userController = new UserController(new UserBusiness(new UserData()));

userRouter.post("/signup", userController.signup);
// userRouter.post("/login", userController.login);