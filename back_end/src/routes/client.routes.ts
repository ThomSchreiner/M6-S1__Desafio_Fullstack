import { Router } from "express";
import {
    createClientController,
    destroyClientController,
    listClientsController,
    retrieveClientController,
    updateClientController,
} from "../controllers/client.controllers";
import { ensureClientExistsMiddleware } from "../middlewares/ensureClientExists.middleware";

export const clientRoutes = Router();

clientRoutes.get("", listClientsController);
clientRoutes.post("", createClientController);
clientRoutes.get("/:id", ensureClientExistsMiddleware, retrieveClientController);
clientRoutes.patch("/:id", ensureClientExistsMiddleware, updateClientController);
clientRoutes.delete("/:id", ensureClientExistsMiddleware, destroyClientController);
