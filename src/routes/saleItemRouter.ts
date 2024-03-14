import express from "express";
import { SaleItemController } from "../controller/SaleItemController";
import { SaleItemBusiness } from "../business/SaleItemBusiness";
import { SaleItemData } from "../data/SaleItemData";
import { Authenticator } from "../services/Authenticator";

export const saleItemRouter = express.Router();

// Criando instância do SaleItemData para manipular os dados dos itens de venda
const saleItemData = new SaleItemData();

// Criando instância do Authenticator para autenticação
const authenticator = new Authenticator();

// Criando instância do SaleItemBusiness com o SaleItemData
const saleItemBusiness = new SaleItemBusiness(saleItemData);

// Passando a instância de SaleItemBusiness e Authenticator para SaleItemController
const saleItemController = new SaleItemController(saleItemBusiness, authenticator);

// Configurando as rotas para operações relacionadas aos itens de venda
saleItemRouter.post("/", saleItemController.createSaleItem);
saleItemRouter.get("/:saleId", saleItemController.getSaleItemsBySaleId);
saleItemRouter.put("/:saleItemId", saleItemController.updateSaleItem);
saleItemRouter.delete("/:saleItemId", saleItemController.deleteSaleItem);
