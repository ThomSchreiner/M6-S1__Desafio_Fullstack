import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors";

export const ensureClientExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const client = await AppDataSource.getRepository(Client)
        .findOneByOrFail({ id: req.params.id })
        .catch(() => {
            throw new AppError("User not found!", 404);
        });

    req.client = client;
    return next();
};
