import { Dispatch, ReactNode, SetStateAction } from "react";
import { iClient, iClientRegister, iContact, iContactRegister, iLogin } from "./user.interfaces";

export interface iContextProps {
    children: ReactNode;
}

export interface iAuthContext {
    login: (body: iLogin) => Promise<void>;
    logout: () => void;
}

export interface iClientContext {
    client: iClient | null;
    setClient: Dispatch<SetStateAction<iClient | null>>;

    clientRegister: (body: iClientRegister) => Promise<void>;
}

export interface iContactContext {
    contacts: iContact[] | null;
    modalContact: iContact | null;
    setModalContact: Dispatch<SetStateAction<iContact | null>>;
    getContacts: () => Promise<void>;
    createContact: (body: iContactRegister, onClose: () => void) => Promise<void>;
    updateContact: (body: iContactRegister, onClose: () => void) => Promise<void>;
    deleteContact: (id: string) => Promise<void>;
}
