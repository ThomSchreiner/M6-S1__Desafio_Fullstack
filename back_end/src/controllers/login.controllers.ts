import { Request, Response } from "express";
import { loginService } from "../services/login.services";

export const loginController = async (req: Request, res: Response) => {
    const token: string = await loginService(req.body);
    return res.json({ token });
};
