import { Request, Response } from "express";
import { ClientBusiness } from "../business/ClientBusiness";
import { Authenticator } from "../services/Authenticator";

export class ClientController {
    private clientBusiness: ClientBusiness;
    private authenticator: Authenticator;

    constructor(clientBusiness: ClientBusiness, authenticator: Authenticator) {
        this.clientBusiness = clientBusiness;
        this.authenticator = authenticator;
    }

    public createClient = async (req: Request, res: Response) => {
        try {
            const { name, email, phone, address } = req.body;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            await this.clientBusiness.createClient(name, email, phone, address, userId);
            res.status(201).send({ message: "Cliente criado com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public getClientsByUser = async (req: Request, res: Response) => {
        try {
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            const clients = await this.clientBusiness.getClientsByUser(userId);
            res.status(200).send({ clients });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public updateClient = async (req: Request, res: Response) => {
        try {
            const { id, name, email, phone, address } = req.body;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            await this.clientBusiness.updateClient(id, name, email, phone, address, userId);
            res.status(200).send({ message: "Cliente atualizado com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }

    public deleteClient = async (req: Request, res: Response) => {
        try {
            const clientId = req.params.id;
            const token = req.headers.authorization as string;
            const userId = this.authenticator.getUserIdFromToken(token);
            await this.clientBusiness.deleteClient(clientId, userId);
            res.status(200).send({ message: "Cliente excluído com sucesso!" });
        } catch (error: any) {
            res.status(400).send({ error: error.message });
        }
    }
}
