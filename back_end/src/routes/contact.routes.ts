import { Router } from "express";
import {
    createContactController,
    destroyContactController,
    listContactsController,
    retrieveContactController,
    updateContactController,
} from "../controllers/contact.controllers";
import { bodyValidateMiddleware } from "../middlewares/bodyValidate.middleware";
import { ensureContactExistsMiddleware } from "../middlewares/ensureContactExists.middleware";
import { verifyTokenMiddleware } from "../middlewares/verifyToken.middleware";
import { contactRequestSchema, contactUpdateSchema } from "../schemas/contact.schemas";

export const contactRoutes = Router();

contactRoutes.get("", verifyTokenMiddleware, listContactsController);
contactRoutes.post(
    "",
    verifyTokenMiddleware,
    bodyValidateMiddleware(contactRequestSchema),
    createContactController
);
contactRoutes.get("/:id", verifyTokenMiddleware, ensureContactExistsMiddleware, retrieveContactController);
contactRoutes.patch(
    "/:id",
    verifyTokenMiddleware,
    ensureContactExistsMiddleware,
    bodyValidateMiddleware(contactUpdateSchema),
    updateContactController
);
contactRoutes.delete("/:id", verifyTokenMiddleware, ensureContactExistsMiddleware, destroyContactController);
