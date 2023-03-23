import * as yup from "yup";
import { Schema } from "yup";
import { iClientRequest, iClientResponse } from "../interfaces/user.interface";

export const clientRequestSchema: Schema<iClientRequest> = yup.object().shape({
    first_name: yup.string().max(50).required(),
    last_name: yup.string().max(50).required(),
    email: yup.string().email().max(127).required(),
    password: yup.string().max(127).required(),
    phone_number: yup.string().min(10).max(11).required(),
});

export const clientResponseSchema: Schema<iClientResponse> = yup.object().shape({
    updatedAt: yup.date().required(),
    createdAt: yup.date().required(),
    phone_number: yup.string().min(10).max(11).required(),
    email: yup.string().email().max(127).required(),
    last_name: yup.string().max(50).required(),
    first_name: yup.string().max(50).required(),
    id: yup.string().uuid().required(),
});

export const listOfClientsResponseSchema = yup.array().of(clientResponseSchema).required();
