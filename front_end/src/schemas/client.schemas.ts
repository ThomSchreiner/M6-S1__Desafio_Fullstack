import * as yup from "yup";
import { ObjectSchema } from "yup";
import { iClientRegister } from "@/interfaces/user.interfaces";

export const clientRegisterSchema: ObjectSchema<iClientRegister> = yup.object().shape({
    first_name: yup.string().max(50).required(),
    last_name: yup.string().max(50).required(),
    email: yup.string().email().max(127).required(),
    password: yup.string().max(127).required(),
    phone_number: yup.string().min(10).max(11).required(),
});
