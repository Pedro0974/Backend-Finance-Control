import { BaseDatabase } from "./BaseData";
import { SaleItem } from "../model/SaleItem";

export class SaleItemData extends BaseDatabase {
    public async createSaleItem(saleItem: SaleItem): Promise<void> {
        try {
            await this.connection("sale_item").insert(saleItem);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getSaleItemsBySaleId(saleId: string): Promise<SaleItem[]> {
        try {
            const saleItems = await this.connection("sale_item")
                .where({ venda_id: saleId });
            return saleItems;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async updateSaleItem(saleItemId: string, saleItem: SaleItem): Promise<void> {
        try {
            await this.connection("sale_item")
                .where({ item_id: saleItemId })
                .update(saleItem);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async deleteSaleItem(saleItemId: string): Promise<void> {
        try {
            await this.connection("sale_item")
                .where({ item_id: saleItemId })
                .del();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // Adicione outros métodos conforme necessário
}
