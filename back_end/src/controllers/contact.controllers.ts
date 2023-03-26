import { Request, Response } from "express";
import { iClientResponse } from "../interfaces/user.interfaces";
import {
    createContactService,
    destroyContactService,
    listContactsService,
    retrieveContactService,
    updateContactService,
} from "../services/contact.services";

export const listContactsController = async (req: Request, res: Response) => {
    const contacts: iClientResponse[] = await listContactsService(req.authClient);
    return res.json(contacts);
};

export const createContactController = async (req: Request, res: Response) => {
    const contact: iClientResponse = await createContactService(req.authClient, req.body);
    return res.status(201).json(contact);
};

export const retrieveContactController = async (req: Request, res: Response) => {
    const contact: iClientResponse = await retrieveContactService(req.paramContact);
    return res.json(contact);
};

export const updateContactController = async (req: Request, res: Response) => {
    const contact: iClientResponse = await updateContactService(req.paramContact, req.body);
    return res.json(contact);
};

export const destroyContactController = async (req: Request, res: Response) => {
    await destroyContactService(req.paramContact);
    return res.status(204).json({});
};
