import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contact.entity";
import { AppError } from "../errors";

export const ensureContactExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const contact = await AppDataSource.getRepository(Contact)
        .findOneByOrFail({ id: req.params.id, client: { id: req.authClient.id } })
        .catch(() => {
            throw new AppError("Contact not found!", 404);
        });

    req.paramContact = contact;
    return next();
};
