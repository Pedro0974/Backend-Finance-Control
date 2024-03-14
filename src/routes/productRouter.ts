import express from "express";
import { ProductController } from "../controller/ProductController";
import { ProductBusiness } from "../business/ProductBusiness";
import { ProductData } from "../data/ProductData";
import { Authenticator } from "../services/Authenticator";

export const productRouter = express.Router();

// Criando instância do ProductData para manipular os dados dos produtos
const productData = new ProductData();

// Criando instância do Authenticator para autenticação
const authenticator = new Authenticator();

// Criando instância do ProductBusiness com o ProductData
const productBusiness = new ProductBusiness(productData);

// Passando a instância de ProductBusiness e Authenticator para ProductController
const productController = new ProductController(productBusiness, authenticator);

// Configurando as rotas para operações relacionadas aos produtos
productRouter.post("/", productController.createProduct);
productRouter.get("/", productController.getProductsByUser);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);
