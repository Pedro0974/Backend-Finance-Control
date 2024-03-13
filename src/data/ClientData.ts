import { Client } from "../model/Client";
import { BaseDatabase } from "./BaseData";

export class ClientData extends BaseDatabase {
    public getClientByUserId = async (userId: string): Promise<Client[]> => {
        try {
            const clients = await this.connection("client")
                .where({ usuario_id: userId });

            return clients.map((client: any) => {
                return {
                    cliente_id: client.cliente_id,
                    nome: client.nome,
                    email: client.email,
                    telefone: client.telefone,
                    endereco: client.endereco,
                    usuario_id: client.usuario_id
                };
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public createClient = async (name: string, email: string, phone: string, address: string, userId: string): Promise<void> => {
        try {
            await this.connection("client").insert({
                nome: name,
                email: email,
                telefone: phone,
                endereco: address,
                usuario_id: userId
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public updateClient = async (clientId: string, name: string, email: string, phone: string, address: string, userId: string): Promise<void> => {
        try {
            await this.connection("client")
                .where({ cliente_id: clientId, usuario_id: userId })
                .update({
                    nome: name,
                    email: email,
                    telefone: phone,
                    endereco: address
                });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public deleteClient = async (clientId: string, userId: string): Promise<void> => {
        try {
            await this.connection("client")
                .where({ cliente_id: clientId, usuario_id: userId })
                .del();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
