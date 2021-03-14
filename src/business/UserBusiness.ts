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
  ):Promise <string> {
    try {
      const idGenerator = new IdGenerator();
      const hashManager = new HashManager();
      const tokenManager = new TokenManager();
      const userDatabase = new UserDatabase();

      const id = idGenerator.generate();
      const hashPassword = await hashManager.hash(password);
      await userDatabase.create(id, name, email, hashPassword, nickname);

      const token = tokenManager.generate(id);
      return token;
    } catch (error) {
      throw new Error("Erro ao criar " + error.message);
    }
  }
}
