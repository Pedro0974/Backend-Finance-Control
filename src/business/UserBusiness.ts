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
        if (!name || !email || !password) {
            throw new Error("Missing input");
        }

        if (!email.includes("@") || !email.includes(".")) {
            throw new Error("Invalid email");
        }

        const existingUser = await this.userData.getUserByEmail(email);
        if (existingUser) {
            throw new Error("Email already registered");
        }

        const id = generateId();

        const hashedPassword = await this.hashManager.hash(password);

        await this.userData.signup(name, email, hashedPassword, id);

        const token = this.authenticator.generateToken({ id });

        return token;
    }

    public login = async (email: string, password: string): Promise<string> => {
        if (!email || !password) {
            throw new Error("Missing input");
        }
        const user = await this.userData.getUserByEmail(email);

        if (!user) {
            throw new Error("User not found");
        }
        const passwordMatch = await this.hashManager.compare(password, user.password);

        if (passwordMatch) {
            const token = this.authenticator.generateToken({ id: user.id });
            return token;
        } else {
            throw new Error("Invalid password");
        }
    }
}
