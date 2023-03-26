import { Router } from "express";
import { loginController } from "../controllers/login.controllers";
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware";
import { loginSchema } from "../schemas/client.schemas";

export const loginRoutes = Router();

loginRoutes.post("", bodyValidateMiddleware(loginSchema), loginController);
