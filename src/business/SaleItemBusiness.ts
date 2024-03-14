import { SaleItemData } from "../data/SaleItemData";
import { SaleItem } from "../model/SaleItem";

export class SaleItemBusiness {
    private saleItemData: SaleItemData;

    constructor(saleItemData: SaleItemData) {
        this.saleItemData = saleItemData;
    }

    public async createSaleItem(saleItem: SaleItem): Promise<void> {
        // Adicione aqui qualquer lógica de validação necessária
        await this.saleItemData.createSaleItem(saleItem);
    }

    public async getSaleItemsBySaleId(saleId: string): Promise<SaleItem[]> {
        // Adicione aqui qualquer lógica de validação necessária
        return await this.saleItemData.getSaleItemsBySaleId(saleId);
    }

    public async updateSaleItem(saleItemId: string, saleItem: SaleItem): Promise<void> {
        // Adicione aqui qualquer lógica de validação necessária
        await this.saleItemData.updateSaleItem(saleItemId, saleItem);
    }

    public async deleteSaleItem(saleItemId: string): Promise<void> {
        // Adicione aqui qualquer lógica de validação necessária
        await this.saleItemData.deleteSaleItem(saleItemId);
    }

    // Adicione outros métodos conforme necessário
}
