import { UserData } from "../data/UserData";

export class UserBusiness{
    private userData: UserData;
    constructor(userData: UserData){
        this.userData = userData;
    }

    public signup = async(name: string, email:string, password:string):Promise<void>=>{
        // Verificar os dados recebidos (obrigatórios vieram?)
        // Valida os dados
            // email existe?
            // Senha segura?
            // Nome contém caracteres indevidos?
            // Verifica se o nome está dentro da política da empresa
            // Tem idade para usar o sistema?
        // Cria um id
        // Criptografa a senha
        // Inserção do usuario no banco
        // Gera o token
        // Retorna o token
    }
}