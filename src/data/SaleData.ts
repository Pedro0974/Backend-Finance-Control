import { BaseDatabase } from "./BaseData";
import { Sale } from "../model/Sale";

export class SaleData extends BaseDatabase {
    public async createSale(sale: Sale): Promise<void> {
        try {
            await this.connection("sale").insert(sale);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async getSaleById(saleId: string): Promise<Sale | null> {
        try {
            const sale = await this.connection("sale")
                .where({ venda_id: saleId })
                .first();

            if (sale) {
                return {
                    venda_id: sale.venda_id,
                    usuario_id: sale.usuario_id,
                    date: sale.date,
                    cliente_id: sale.cliente_id,
                    total: sale.total,
                    total_pagamento: sale.total_pagamento,
                    quantidade_parcelas: sale.quantidade_parcelas,
                    data_primeira_parcela: sale.data_primeira_parcela,
                    valor_parcela: sale.valor_parcela,
                    valor_pago: sale.valor_pago,
                    status: sale.status
                };
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async updateSale(saleId: string, sale: Sale): Promise<void> {
        try {
            await this.connection("sale")
                .where({ venda_id: saleId })
                .update(sale);
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async deleteSale(saleId: string): Promise<void> {
        try {
            await this.connection("sale")
                .where({ venda_id: saleId })
                .del();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    // Adicione outros métodos conforme necessário
}
