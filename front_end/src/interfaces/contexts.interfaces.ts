import { Dispatch, ReactNode, SetStateAction } from "react";
import {
    iClient,
    iClientRegister,
    iClientUpdate,
    iContact,
    iContactRegister,
    iContactUpdate,
    iLogin,
} from "./user.interfaces";

export interface iContextProps {
    children: ReactNode;
}

export interface iAuthContext {
    login: (body: iLogin) => Promise<void>;
    logout: () => void;
}

export interface iClientContext {
    client: iClient | null;
    getClient: () => Promise<void>;
    clientRegister: (body: iClientRegister) => Promise<void>;
    updateClient: (body: iClientUpdate, onClose: () => void) => Promise<void>;
}

export interface iContactContext {
    contacts: iContact[] | null;
    modalContact: iContact | null;
    setModalContact: Dispatch<SetStateAction<iContact | null>>;
    getContacts: () => Promise<void>;
    createContact: (body: iContactRegister, onClose: () => void) => Promise<void>;
    updateContact: (body: iContactUpdate, onClose: () => void) => Promise<void>;
    deleteContact: (id: string) => Promise<void>;
}
