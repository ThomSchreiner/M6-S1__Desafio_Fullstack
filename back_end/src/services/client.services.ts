import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { AppError } from "../errors";
import { iClientRequest, iClientResponse } from "../interfaces/user.interface";
import { clientResponseSchema, listOfClientsResponseSchema } from "../schemas/client.schemas";

export const listClientsService = async (): Promise<iClientResponse[]> => {
    const clients = await AppDataSource.getRepository(Client).find();
    const validated = listOfClientsResponseSchema.validateSync(clients, { stripUnknown: true });
    return validated;
};

export const createClientService = async (body: iClientRequest): Promise<iClientResponse> => {
    const clientRepo = AppDataSource.getRepository(Client);

    await clientRepo.findOneBy({ email: body.email }).then((res) => {
        if (res !== null) {
            throw new AppError("This email already used!", 409);
        }
    });

    await clientRepo.findOneBy({ phone_number: body.phone_number }).then((res) => {
        if (res !== null) {
            throw new AppError("This phone number already used!", 409);
        }
    });

    let client = clientRepo.create(body);
    client = await clientRepo.save(client);

    const validated = clientResponseSchema.validateSync(client, { stripUnknown: true });
    return validated;
};

export const retrieveClientService = async (client: Client): Promise<iClientResponse> => {
    const validated = clientResponseSchema.validateSync(client, { stripUnknown: true });
    return validated;
};

export const updateClientService = async (client: Client, body: iClientRequest): Promise<iClientResponse> => {
    const clientRepo = AppDataSource.getRepository(Client);

    client = clientRepo.create({ ...client, ...body });
    client = await clientRepo.save(client);

    const validated = clientResponseSchema.validateSync(client, { stripUnknown: true });
    return validated;
};

export const destroyClientService = async (clientId: string): Promise<Object> => {
    const clientRepo = AppDataSource.getRepository(Client);

    await clientRepo.softDelete({ id: clientId });
    return {};
};
