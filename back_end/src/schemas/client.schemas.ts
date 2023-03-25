import * as yup from "yup";
import { ObjectSchema } from "yup";
import { iClientRequest, iClientResponse, iLogin } from "../interfaces/user.interfaces";

export const clientRequestSchema: ObjectSchema<iClientRequest> = yup.object().shape({
    first_name: yup.string().max(50).required(),
    last_name: yup.string().max(50).required(),
    email: yup.string().email().max(127).required(),
    password: yup.string().max(127).required(),
    phone_number: yup.string().min(10).max(11).required(),
});

export const clientUpdateSchema = clientRequestSchema.partial();

export const clientResponseSchema: ObjectSchema<iClientResponse> = yup.object().shape({
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    phone_number: yup.string().min(10).max(11).required(),
    email: yup.string().email().max(127).required(),
    last_name: yup.string().max(50).required(),
    first_name: yup.string().max(50).required(),
    id: yup.string().uuid().required(),
});

export const listOfClientsResponseSchema = yup.array().of(clientResponseSchema).required();

export const loginSchema: ObjectSchema<iLogin> = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});
