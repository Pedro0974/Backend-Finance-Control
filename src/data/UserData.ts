import { User } from "../model/User";
import { BaseDatabase } from "./BaseData";

export class UserData extends BaseDatabase {
    public getUserByEmail = async(email: string):Promise<void>=>{
        //Conexão com o banco para buscar usuario por email
    }

    public signup = async (name: string, email: string, password: string, id: string): Promise<void> => {
        //Conexão com o banco para inserir
    }
}