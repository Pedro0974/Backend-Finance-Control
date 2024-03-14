import express from "express";
import { StockController } from "../controller/StockController";
import { StockBusiness } from "../business/StockBusiness";
import { StockData } from "../data/StockData";
import { Authenticator } from "../services/Authenticator";

export const stockRouter = express.Router();

// Criando instância do StockData para manipular os dados do estoque
const stockData = new StockData();

// Criando instância do Authenticator para autenticação
const authenticator = new Authenticator();

// Criando instância do StockBusiness com o StockData
const stockBusiness = new StockBusiness(stockData);

// Passando a instância de StockBusiness e Authenticator para StockController
const stockController = new StockController(stockBusiness, authenticator);

// Configurando as rotas para operações relacionadas ao estoque
stockRouter.post("/", stockController.createStock);
stockRouter.get("/:productId", stockController.getStockByUserAndProduct);
stockRouter.put("/:productId", stockController.updateStock);
stockRouter.delete("/:productId", stockController.deleteStock);
