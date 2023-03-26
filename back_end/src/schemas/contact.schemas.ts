import { ObjectSchema } from "yup";
import { iContactRequest } from "../interfaces/user.interfaces";
import { clientRequestSchema } from "./client.schemas";

export const contactRequestSchema: ObjectSchema<iContactRequest> = clientRequestSchema.omit(["password"]);

export const contactUpdateSchema = contactRequestSchema.partial();
