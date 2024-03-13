import { ClientData } from "../data/ClientData";

export class ClientBusiness {
    private clientData: ClientData;

    constructor(clientData: ClientData) {
        this.clientData = clientData;
    }

    public createClient = async (name: string, email: string, phone: string, address: string, userId: string): Promise<void> => {
        if (!name || !email || !phone || !address || !userId) {
            throw new Error("Missing input");
        }
        await this.clientData.createClient(name, email, phone, address, userId);
    }

    public getClientsByUser = async (userId: string) => {
        const clients = await this.clientData.getClientByUserId(userId);
        return clients;
    }

    public updateClient = async (clientId: string, name: string, email: string, phone: string, address: string, userId: string): Promise<void> => {
        if (!clientId || !name || !email || !phone || !address || !userId) {
            throw new Error("Missing input");
        }
        await this.clientData.updateClient(clientId, name, email, phone, address, userId);
    }

    public deleteClient = async (clientId: string, userId: string): Promise<void> => {
        if (!clientId || !userId) {
            throw new Error("Missing input");
        }
        await this.clientData.deleteClient(clientId, userId);
    }
}
