import { StockData } from "../data/StockData";

export class StockBusiness {
    private stockData: StockData;

    constructor(stockData: StockData) {
        this.stockData = stockData;
    }

    public createStock = async (userId: string, productId: string, quantity: string): Promise<void> => {
        if (!userId || !productId || !quantity) {
            throw new Error("Missing input");
        }
        await this.stockData.createStock(userId, productId, quantity);
    }

    public getStockByUserAndProduct = async (userId: string, productId: string): Promise<any | null> => {
        if (!userId || !productId) {
            throw new Error("Missing input");
        }
        return await this.stockData.getStockByUserAndProduct(userId, productId);
    }

    public updateStock = async (userId: string, productId: string, quantity: string): Promise<void> => {
        if (!userId || !productId || !quantity) {
            throw new Error("Missing input");
        }
        await this.stockData.updateStock(userId, productId, quantity);
    }

    public deleteStock = async (userId: string, productId: string): Promise<void> => {
        if (!userId || !productId) {
            throw new Error("Missing input");
        }
        await this.stockData.deleteStock(userId, productId);
    }
}
