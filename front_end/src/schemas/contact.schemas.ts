import { ObjectSchema } from "yup";
import { iContactRegister } from "@/interfaces/user.interfaces";
import { clientRegisterSchema } from "./client.schemas";

export const contactRegisterSchema: ObjectSchema<iContactRegister> = clientRegisterSchema.omit(["password"]);

export const contactUpdateSchema = contactRegisterSchema.partial();
