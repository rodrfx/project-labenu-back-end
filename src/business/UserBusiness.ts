import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManger";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManagar";

export class UserBusiness {
  async create(
    name: string,
    email: string,
    password: string,
    nickname: string
  ): Promise<string> {
    try {
      const idGenerator = new IdGenerator();
      const hashManager = new HashManager();
      const tokenManager = new TokenManager();
      const userDatabase = new UserDatabase();

      const id = idGenerator.generate();
      const hashPassword = await hashManager.hash(password);

      if (!name || !password || !email || !nickname) {
        throw new Error("Todos os campos devem ser preenchidos.");
      }

      if (email.indexOf("@") === -1) {
        throw new Error("E-mail inválido");
      }

      if (password.length < 6) {
        throw new Error("A senha deve ter no mínimo 6 caracteres");
      }

      await userDatabase.create(id, name, email, hashPassword, nickname);

      const token = tokenManager.generate(id);
      return token;
    } catch (error) {
      throw new Error("Erro ao criar " + error.message);
    }
  }
}
