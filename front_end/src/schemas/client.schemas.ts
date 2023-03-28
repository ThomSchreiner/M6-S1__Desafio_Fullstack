import * as yup from "yup";
import { ObjectSchema } from "yup";
import { iClientRegister, iClientUpdate } from "@/interfaces/user.interfaces";

export const clientRegisterSchema: ObjectSchema<iClientRegister> = yup.object().shape({
    first_name: yup.string().max(50).required(),
    last_name: yup.string().max(50).required(),
    email: yup.string().email().max(127).required(),
    password: yup.string().max(127).required(),
    phone_number: yup.string().min(10).max(11).required(),
});

export const clientUpdateSchema: ObjectSchema<iClientUpdate> = yup
    .object()
    .shape({
        first_name: yup
            .string()
            .max(50)
            .transform((first_name) => (!first_name ? undefined : first_name)),
        last_name: yup
            .string()
            .max(50)
            .transform((last_name) => (!last_name ? undefined : last_name)),
        email: yup
            .string()
            .email()
            .max(127)
            .transform((email) => (!email ? undefined : email)),
        password: yup
            .string()
            .max(127)
            .transform((password) => (!password ? undefined : password)),
        phone_number: yup
            .string()
            .min(10)
            .max(11)
            .transform((phone_number) => (!phone_number ? undefined : phone_number)),
    })
    .partial();
