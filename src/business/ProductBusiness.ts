import { ProductData } from "../data/ProductData";
import { Product } from "../model/Product";

export class ProductBusiness {
    private productData: ProductData;

    constructor(productData: ProductData) {
        this.productData = productData;
    }

    public createProduct = async (name: string, description: string, price: string, userId: string): Promise<void> => {
        if (!name || !description || !price || !userId) {
            throw new Error("Missing input");
        }
        await this.productData.createProduct(name, description, price, userId);
    }

    public getProductsByUser = async (userId: string): Promise<Product[]> => {
        const products = await this.productData.getProductsByUserId(userId);
        return products;
    }

    public updateProduct = async (productId: string, name: string, description: string, price: string, userId: string): Promise<void> => {
        if (!productId || !name || !description || !price || !userId) {
            throw new Error("Missing input");
        }
        await this.productData.updateProduct(productId, name, description, price, userId);
    }

    public deleteProduct = async (productId: string, userId: string): Promise<void> => {
        if (!productId || !userId) {
            throw new Error("Missing input");
        }
        await this.productData.deleteProduct(productId, userId);
    }
}
