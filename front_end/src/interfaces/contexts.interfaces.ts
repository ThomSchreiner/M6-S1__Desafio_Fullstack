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
    contactRegister: (body: iContactRegister, onClose: () => void) => Promise<void>;
}
