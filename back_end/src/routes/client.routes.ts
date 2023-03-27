import { Router } from "express";
import {
    createClientController,
    destroyClientController,
    listClientsController,
    retrieveClientByTokenController,
    retrieveClientController,
    updateClientController,
} from "../controllers/client.controllers";
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware";
import { ensureClientExistsMiddleware } from "../middlewares/ensureClientExists.middleware";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import { clientRequestSchema, clientUpdateSchema } from "../schemas/client.schemas";

export const clientRoutes = Router();

clientRoutes.get("", listClientsController);
clientRoutes.post("", bodyValidateMiddleware(clientRequestSchema), createClientController);
clientRoutes.get("/profile", verifyTokenMiddleware, retrieveClientByTokenController);
clientRoutes.get("/:id", verifyTokenMiddleware, ensureClientExistsMiddleware, retrieveClientController);
clientRoutes.patch(
    "/:id",
    verifyTokenMiddleware,
    ensureClientExistsMiddleware,
    bodyValidateMiddleware(clientUpdateSchema),
    updateClientController
);
clientRoutes.delete("/:id", verifyTokenMiddleware, ensureClientExistsMiddleware, destroyClientController);
