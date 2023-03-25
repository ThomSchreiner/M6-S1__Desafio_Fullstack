import { Client } from "../../entities/client.entity";

declare global {
    namespace Express {
        interface Request {
            paramClient: Client;
            authClient: Client;
        }
    }
}

export {};
