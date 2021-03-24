import express, { Express } from "express";
import cors from "cors";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { UserController } from "./controller/UserController";
import { TagsController } from "./controller/TagsController";
import { ImageController } from "./controller/ImageController";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

const userController = new UserController();
app.post("/user/signup", userController.create);
app.post("/user/login", userController.login);

const tagsController = new TagsController();
app.put("/tags/", tagsController.create);
app.get("/tags/", tagsController.get);

const imageController = new ImageController();
app.post("/createImage", imageController.create);
app.get("/image/all", imageController.get);
app.get("/image/:id", imageController.getImageById);


const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost: ${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});
