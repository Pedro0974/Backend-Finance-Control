import { UserData } from "../data/UserData";
import { generateId } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator, AuthenticationData } from "../services/Authenticator";

export class UserBusiness {
    private userData: UserData;
    private hashManager: HashManager;
    private authenticator: Authenticator;

    constructor(userData: UserData, hashManager: HashManager, authenticator: Authenticator) {
        this.userData = userData;
        this.hashManager = hashManager;
        this.authenticator = authenticator;
    }

    public signup = async (name: string, email: string, password: string): Promise<string> => {
        // Verifica se todos os dados obrigatórios estão presentes
        if (!name || !email || !password) {
            throw new Error("Missing input");
        }

        // Valida o email
        if (!email.includes("@") || !email.includes(".")) {
            throw new Error("Invalid email");
        }

        // Verifica se o email já está em uso
        const existingUser = await this.userData.getUserByEmail(email);
        if (existingUser) {
            throw new Error("Email already registered");
        }

        // Cria um id único
        const id = generateId();

        // Criptografa a senha
        const hashedPassword = await this.hashManager.hash(password);

        // Insere o usuário no banco de dados
        await this.userData.signup(name, email, hashedPassword, id);

        // Gera o token
        const token = this.authenticator.generateToken({ id });

        return token;
    }
}
