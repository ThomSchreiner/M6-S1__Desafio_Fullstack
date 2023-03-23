import { Client } from "../../entities/client.entity";

declare global {
    namespace Express {
        interface Request {
            client: Client;
        }
    }
}

export {};
