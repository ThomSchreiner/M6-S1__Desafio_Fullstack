import { AppDataSource } from "../data-source";
import { Client } from "../entities/client.entity";
import { Contact } from "../entities/contact.entity";
import { AppError } from "../errors";
import { iClientResponse, iContactRequest } from "../interfaces/user.interfaces";
import { clientResponseSchema, listOfClientsResponseSchema } from "../schemas/client.schemas";

export const listContactsService = async (client: Client): Promise<iClientResponse[]> => {
    const contacts = await AppDataSource.getRepository(Contact).findBy({ client: { id: client.id } });

    const validated = listOfClientsResponseSchema.validateSync(contacts, { stripUnknown: true });
    return validated;
};

export const createContactService = async (
    client: Client,
    body: iContactRequest
): Promise<iClientResponse> => {
    const contactRepo = AppDataSource.getRepository(Contact);

    await contactRepo.findOneBy({ email: body.email, client: { id: client.id } }).then((res) => {
        if (res !== null) {
            throw new AppError("This email already registred!", 409);
        }
    });

    await contactRepo
        .findOneBy({ phone_number: body.phone_number, client: { id: client.id } })
        .then((res) => {
            if (res !== null) {
                throw new AppError("This phone number already registred!", 409);
            }
        });

    let contact = contactRepo.create({ ...body, client });
    contact = await contactRepo.save(contact);

    const validated = clientResponseSchema.validateSync(contact, { stripUnknown: true });
    return validated;
};

export const retrieveContactService = async (contact: Contact): Promise<iClientResponse> => {
    const validated = clientResponseSchema.validateSync(contact, { stripUnknown: true });
    return validated;
};

export const updateContactService = async (
    contact: Contact,
    body: iContactRequest
): Promise<iClientResponse> => {
    const contactRepo = AppDataSource.getRepository(Contact);

    contact = contactRepo.create({ ...contact, ...body });
    contact = await contactRepo.save(contact);

    const validated = clientResponseSchema.validateSync(contact, { stripUnknown: true });
    return validated;
};

export const destroyContactService = async (contact: Contact): Promise<Object> => {
    const contactRepo = AppDataSource.getRepository(Contact);

    await contactRepo.delete({ id: contact.id });
    return {};
};
