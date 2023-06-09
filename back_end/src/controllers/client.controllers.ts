import { Request, Response } from "express";
import { iClientResponse } from "../interfaces/user.interfaces";
import {
    createClientService,
    destroyClientService,
    listClientsService,
    retrieveClientService,
    updateClientService,
} from "../services/client.services";

export const listClientsController = async (req: Request, res: Response) => {
    const clients: iClientResponse[] = await listClientsService();
    return res.json(clients);
};

export const createClientController = async (req: Request, res: Response) => {
    const client: iClientResponse = await createClientService(req.body);
    return res.status(201).json(client);
};

export const retrieveClientController = async (req: Request, res: Response) => {
    const client: iClientResponse = await retrieveClientService(req.paramClient);
    return res.json(client);
};

export const retrieveClientByTokenController = async (req: Request, res: Response) => {
    const client: iClientResponse = await retrieveClientService(req.authClient);
    return res.json(client);
};

export const updateClientController = async (req: Request, res: Response) => {
    const client: iClientResponse = await updateClientService(req.paramClient, req.body);
    return res.json(client);
};

export const destroyClientController = async (req: Request, res: Response) => {
    await destroyClientService(req.params.id);
    return res.status(204).json({});
};
