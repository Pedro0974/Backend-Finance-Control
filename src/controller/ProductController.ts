import { Request, Response } from "express";
import { ProductBusiness } from "../business/ProductBusiness";
import { Authenticator } from "../services/Authenticator";

export class ProductController {
    private productBusiness: ProductBusiness;
    private authenticator: Authenticator;

    constructor(productBusiness: ProductBusiness, authenticator: Authenticator) {
        this.productBusiness = productBusiness;
        this.authenticator = authenticator;
    }

    public createProduct = async (req: Request, res: Response) => {
        try {
            const { name, description, price } = req.body;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            await this.productBusiness.createProduct(name, description, price, userId);
            res.status(201).send({ message: "Produto criado com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public getProductsByUser = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            const products = await this.productBusiness.getProductsByUser(userId);
            res.status(200).send({ products });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public updateProduct = async (req: Request, res: Response) => {
        try {
            const { id, name, description, price } = req.body;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            await this.productBusiness.updateProduct(id, name, description, price, userId);
            res.status(200).send({ message: "Produto atualizado com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public deleteProduct = async (req: Request, res: Response) => {
        try {
            const productId = req.params.id;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            await this.productBusiness.deleteProduct(productId, userId);
            res.status(200).send({ message: "Produto excluído com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }
}
