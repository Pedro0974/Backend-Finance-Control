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
}
