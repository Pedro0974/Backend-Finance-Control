import { BaseDatabase } from "./BaseData";

export class StockData extends BaseDatabase {
    public createStock = async (userId: string, productId: string, quantity: string): Promise<void> => {
        try {
            await this.connection("estoque").insert({
                usuario_id: userId,
                produto_id: productId,
                quantidade: quantity
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public getStockByUserAndProduct = async (userId: string, productId: string): Promise<any | null> => {
        try {
            const stock = await this.connection("estoque")
                .where({ usuario_id: userId, produto_id: productId })
                .first();

            return stock;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public updateStock = async (userId: string, productId: string, quantity: string): Promise<void> => {
        try {
            await this.connection("estoque")
                .where({ usuario_id: userId, produto_id: productId })
                .update({ quantidade: quantity });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public deleteStock = async (userId: string, productId: string): Promise<void> => {
        try {
            await this.connection("estoque")
                .where({ usuario_id: userId, produto_id: productId })
                .del();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
