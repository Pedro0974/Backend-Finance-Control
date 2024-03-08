import { User } from "../model/User";
import { BaseDatabase } from "./BaseData";

export class UserData extends BaseDatabase {
    public getUserByEmail = async (email: string): Promise<User | null> => {
        try {
            const user = await this.connection("users")
                .where({ email })
                .first();

            if (user) {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password
                };
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public signup = async (name: string, email: string, password: string, id: string): Promise<void> => {
        try {
            await this.connection("users").insert({
                id,
                name,
                email,
                password
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public login = async (email: string, password: string): Promise<User | null> => {
        try {
            // Busca o usuário pelo email
            const user = await this.getUserByEmail(email);

            // Se não encontrar o usuário, retorna null
            if (!user) {
                return null;
            }

            // Verifica se a senha fornecida corresponde à senha armazenada
            const passwordMatch = user.password === password;

            // Se as senhas corresponderem, retorna o usuário
            if (passwordMatch) {
                return user;
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}
