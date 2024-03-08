import { UserData } from "../data/UserData";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { generateId } from "../services/IdGenerator";

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

    public login = async (email: string, password: string): Promise<string> => {
        // Verifica se todos os dados obrigatórios estão presentes
        if (!email || !password) {
            throw new Error("Missing input");
        }

        // Busca o usuário pelo email
        const user = await this.userData.getUserByEmail(email);

        // Se o usuário não for encontrado, lança um erro
        if (!user) {
            throw new Error("User not found");
        }

        // Verifica se a senha fornecida corresponde à senha armazenada
        const passwordMatch = await this.hashManager.compare(password, user.password);

        // Se as senhas corresponderem, gera o token de autenticação
        if (passwordMatch) {
            const token = this.authenticator.generateToken({ id: user.id });
            return token;
        } else {
            throw new Error("Invalid password");
        }
    }
}
