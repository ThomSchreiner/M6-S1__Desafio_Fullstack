import { Client } from "../../entities/client.entity";
import { Contact } from "../../entities/contact.entity";

declare global {
    namespace Express {
        interface Request {
            paramClient: Client;
            paramContact: Contact;
            authClient: Client;
        }
    }
}

export {};
