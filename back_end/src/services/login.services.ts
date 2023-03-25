import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors";
import { iLogin } from "../interfaces/user.interfaces";

export const loginService = async (body: iLogin): Promise<string> => {
    const client = await AppDataSource.getRepository(Client)
        .findOneByOrFail({ email: body.email })
        .then((res) => {
            const isValidPassword = compareSync(body.password, res.password);
            if (isValidPassword) {
                return res;
            }
            throw new AppError("Email or password incorrect!", 403);
        })
        .catch(() => {
            throw new AppError("Email or password incorrect!", 403);
        });

    const token = sign({}, process.env.SECRET_KEY || "", { expiresIn: "8h", subject: client.id });
    return token;
};
