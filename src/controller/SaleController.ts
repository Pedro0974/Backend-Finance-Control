import { Request, Response } from "express";
import { SaleBusiness } from "../business/SaleBusiness";
import { Authenticator } from "../services/Authenticator";
import { Sale } from "../model/Sale";

export class SaleController {
    private saleBusiness: SaleBusiness;
    private authenticator: Authenticator;

    constructor(saleBusiness: SaleBusiness, authenticator: Authenticator) {
        this.saleBusiness = saleBusiness;
        this.authenticator = authenticator;
    }

    public async createSale(req: Request, res: Response): Promise<void> {
        try {
            const sale: Sale = req.body;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            sale.usuario_id = userId; // Adiciona o ID do usuário à venda
            await this.saleBusiness.createSale(sale);
            res.status(201).send({ message: "Venda criada com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public async getSaleById(req: Request, res: Response): Promise<void> {
        try {
            const saleId = req.params.id;
            const sale = await this.saleBusiness.getSaleById(saleId);
            if (sale) {
                res.status(200).send({ sale });
            } else {
                res.status(404).send({ message: "Venda não encontrada" });
            }
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public async updateSale(req: Request, res: Response): Promise<void> {
        try {
            const saleId = req.params.id;
            const sale: Sale = req.body;
            await this.saleBusiness.updateSale(saleId, sale);
            res.status(200).send({ message: "Venda atualizada com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public async deleteSale(req: Request, res: Response): Promise<void> {
        try {
            const saleId = req.params.id;
            await this.saleBusiness.deleteSale(saleId);
            res.status(200).send({ message: "Venda excluída com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    // Adicione outros métodos conforme necessário
}
