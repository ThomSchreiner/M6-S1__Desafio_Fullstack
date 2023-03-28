import { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { iClient } from "./user.interfaces";

export interface iDashboardProps {
    client: iClient;
}

export interface iStyledHeader {
    userName: string;
}

export interface iStyledInput {
    label: string;
    inputType: HTMLInputTypeAttribute;
    placeholder: string;
    register: UseFormRegisterReturn<string>;
    errors: FieldError | undefined;
    value?: string;
}

export interface iStyledLink {
    href: string;
    text: string;
}

export type iModalFormat = "createContact" | "updateContact";

export interface iModalContainer {
    isOpen: boolean;
    onClose: () => void;
    modalFormat: iModalFormat;
}

export interface iModalForm {
    onClose: () => void;
}
