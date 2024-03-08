import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserData } from "../data/UserData";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";

export const userRouter = express.Router();

// Criando instâncias dos serviços necessários
const hashManager = new HashManager();
const authenticator = new Authenticator();
const userData = new UserData();

// Criando instância de UserBusiness com as instâncias dos serviços
const userBusiness = new UserBusiness(userData, hashManager, authenticator);

// Passando a instância de UserBusiness para UserController
const userController = new UserController(userBusiness);

// Configurando a rota para signup
userRouter.post("/signup", userController.signup);
