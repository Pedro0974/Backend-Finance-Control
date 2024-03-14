import express from "express";
import { SaleController } from "../controller/SaleController";
import { SaleBusiness } from "../business/SaleBusiness";
import { SaleData } from "../data/SaleData";
import { Authenticator } from "../services/Authenticator";

export const saleRouter = express.Router();

// Criando instância do SaleData para manipular os dados das vendas
const saleData = new SaleData();

// Criando instância do Authenticator para autenticação
const authenticator = new Authenticator();

// Criando instância do SaleBusiness com o SaleData
const saleBusiness = new SaleBusiness(saleData);

// Passando a instância de SaleBusiness e Authenticator para SaleController
const saleController = new SaleController(saleBusiness, authenticator);

// Configurando as rotas para operações relacionadas às vendas
saleRouter.post("/", saleController.createSale.bind(saleController));
saleRouter.get("/:id", saleController.getSaleById.bind(saleController));
saleRouter.put("/:id", saleController.updateSale.bind(saleController));
saleRouter.delete("/:id", saleController.deleteSale.bind(saleController));
