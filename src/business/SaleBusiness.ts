import { SaleData } from "../data/SaleData";
import { Sale } from "../model/Sale";

export class SaleBusiness {
    private saleData: SaleData;

    constructor(saleData: SaleData) {
        this.saleData = saleData;
    }

    public async createSale(sale: Sale): Promise<void> {
        try {
            await this.saleData.createSale(sale);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getSaleById(saleId: string): Promise<Sale | null> {
        try {
            const sale = await this.saleData.getSaleById(saleId);
            return sale;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async updateSale(saleId: string, sale: Sale): Promise<void> {
        try {
            await this.saleData.updateSale(saleId, sale);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async deleteSale(saleId: string): Promise<void> {
        try {
            await this.saleData.deleteSale(saleId);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // Adicione outros métodos conforme necessário
}
