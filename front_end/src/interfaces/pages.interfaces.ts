import { Dispatch, HTMLInputTypeAttribute, SetStateAction } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { BlockLike } from "typescript";
import { iClient } from "./user.interfaces";

export interface iDashboardProps {
    client: iClient;
}

export interface iStyledHeader {
    user: iClient | null;
    setModalFormat: Dispatch<SetStateAction<iModalFormat>>;
    onOpen: () => void;
}

export interface iStyledInput {
    label: string;
    inputType: HTMLInputTypeAttribute;
    placeholder: string;
    register: UseFormRegisterReturn<string>;
    errors: FieldError | undefined;
    partial?: boolean;
    value?: string;
}

export interface iStyledLink {
    href: string;
    text: string;
}

export type iModalFormat = "createContact" | "updateContact" | "updateClient";

export interface iModalContainer {
    isOpen: boolean;
    onClose: () => void;
    modalFormat: iModalFormat;
}

export interface iModalForm {
    onClose: () => void;
}
