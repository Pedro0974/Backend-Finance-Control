import { Product } from "../model/Product";
import { BaseDatabase } from "./BaseData";

export class ProductData extends BaseDatabase {
    public getProductsByUserId = async (userId: string): Promise<Product[]> => {
        try {
            const products = await this.connection("produto")
                .where({ usuario_id: userId });

            return products.map((product: any) => {
                return {
                    produto_id: product.produto_id,
                    nome: product.nome,
                    descricao: product.descricao,
                    preco: product.preco,
                    usuario_id: product.usuario_id
                };
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public createProduct = async (name: string, description: string, price: string, userId: string): Promise<void> => {
        try {
            await this.connection("produto").insert({
                nome: name,
                descricao: description,
                preco: price,
                usuario_id: userId
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public updateProduct = async (productId: string, name: string, description: string, price: string, userId: string): Promise<void> => {
        try {
            await this.connection("produto")
                .where({ produto_id: productId, usuario_id: userId })
                .update({
                    nome: name,
                    descricao: description,
                    preco: price
                });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public deleteProduct = async (productId: string, userId: string): Promise<void> => {
        try {
            await this.connection("produto")
                .where({ produto_id: productId, usuario_id: userId })
                .del();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
