import { Request, Response } from "express";
import { SaleItemBusiness } from "../business/SaleItemBusiness";
import { Authenticator } from "../services/Authenticator";
import { SaleItem } from "../model/SaleItem";

export class SaleItemController {
    private saleItemBusiness: SaleItemBusiness;
    private authenticator: Authenticator;

    constructor(saleItemBusiness: SaleItemBusiness, authenticator: Authenticator) {
        this.saleItemBusiness = saleItemBusiness;
        this.authenticator = authenticator;
    }

    public async createSaleItem(req: Request, res: Response): Promise<void> {
        try {
            const { venda_id, produto_id, quantidade, preco_unitario } = req.body;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            
            const saleItem: SaleItem = {
                venda_id,
                produto_id,
                quantidade,
                preco_unitario,
                item_id: ""
            };
            
            await this.saleItemBusiness.createSaleItem(saleItem);
            
            res.status(201).send({ message: "Sale item created successfully" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public async getSaleItemsBySaleId(req: Request, res: Response): Promise<void> {
        try {
            const saleId = req.params.saleId;
            const saleItems = await this.saleItemBusiness.getSaleItemsBySaleId(saleId);
            
            res.status(200).send({ saleItems });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public async updateSaleItem(req: Request, res: Response): Promise<void> {
        try {
            const saleItemId = req.params.saleItemId;
            const { venda_id, produto_id, quantidade, preco_unitario } = req.body;
            
            const saleItem: SaleItem = {
                venda_id,
                produto_id,
                quantidade,
                preco_unitario,
                item_id: ""
            };
            
            await this.saleItemBusiness.updateSaleItem(saleItemId, saleItem);
            
            res.status(200).send({ message: "Sale item updated successfully" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public async deleteSaleItem(req: Request, res: Response): Promise<void> {
        try {
            const saleItemId = req.params.saleItemId;
            await this.saleItemBusiness.deleteSaleItem(saleItemId);
            res.status(200).send({ message: "Sale item deleted successfully" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // Adicione outros métodos conforme necessário
}
