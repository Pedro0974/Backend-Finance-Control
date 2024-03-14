import { Request, Response } from "express";
import { StockBusiness } from "../business/StockBusiness";
import { Authenticator } from "../services/Authenticator";

export class StockController {
    private stockBusiness: StockBusiness;
    private authenticator: Authenticator;

    constructor(stockBusiness: StockBusiness, authenticator: Authenticator) {
        this.stockBusiness = stockBusiness;
        this.authenticator = authenticator;
    }

    public createStock = async (req: Request, res: Response) => {
        try {
            const { productId, quantity } = req.body;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            await this.stockBusiness.createStock(userId, productId, quantity);
            res.status(201).send({ message: "Estoque criado com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public getStockByUserAndProduct = async (req: Request, res: Response) => {
        try {
            const productId = req.params.productId;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            const stock = await this.stockBusiness.getStockByUserAndProduct(userId, productId);
            res.status(200).send({ stock });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public updateStock = async (req: Request, res: Response) => {
        try {
            const { productId, quantity } = req.body;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            await this.stockBusiness.updateStock(userId, productId, quantity);
            res.status(200).send({ message: "Estoque atualizado com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public deleteStock = async (req: Request, res: Response) => {
        try {
            const productId = req.params.productId;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            await this.stockBusiness.deleteStock(userId, productId);
            res.status(200).send({ message: "Estoque excluído com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }
}
