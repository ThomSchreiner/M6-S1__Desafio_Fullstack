import { Router } from "express";
import {
    createClientController,
    destroyClientController,
    listClientsController,
    retrieveClientController,
    updateClientController,
} from "../controllers/client.controllers";
import { ensureClientExistsMiddleware } from "../middlewares/ensureClientExists.middleware";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";

export const clientRoutes = Router();

clientRoutes.get("", listClientsController);
clientRoutes.post("", createClientController);
clientRoutes.get("/:id", verifyTokenMiddleware, ensureClientExistsMiddleware, retrieveClientController);
clientRoutes.patch("/:id", verifyTokenMiddleware, ensureClientExistsMiddleware, updateClientController);
clientRoutes.delete("/:id", verifyTokenMiddleware, ensureClientExistsMiddleware, destroyClientController);
