import express from "express";
import { ClientController } from "../controller/ClientController";
import { ClientBusiness } from "../business/ClientBusiness";
import { ClientData } from "../data/ClientData";
import { Authenticator } from "../services/Authenticator"; // Importe o Authenticator

export const clientRouter = express.Router();

// Criando instância do ClientData para manipular os dados dos clientes
const clientData = new ClientData();

// Criando instância do Authenticator para autenticação
const authenticator = new Authenticator();

// Criando instância do ClientBusiness com o ClientData
const clientBusiness = new ClientBusiness(clientData);

// Passando a instância de ClientBusiness e Authenticator para ClientController
const clientController = new ClientController(clientBusiness, authenticator);

// Configurando as rotas para operações relacionadas aos clientes
clientRouter.post("/", clientController.createClient);
clientRouter.get("/", clientController.getClientsByUser);
clientRouter.put("/:id", clientController.updateClient);
clientRouter.delete("/:id", clientController.deleteClient);
