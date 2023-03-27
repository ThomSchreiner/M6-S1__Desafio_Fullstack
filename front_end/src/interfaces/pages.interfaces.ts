import { iClient, iContact } from "./user.interfaces";

export interface iDashboardProps {
    contacts: iContact[];
    client: iClient;
}

export interface iStyledHeader {
    userName: string;
}

export interface iStyledLink {
    href: string;
    text: string;
}

export interface iModalCreateContatc {
    isOpen: boolean;
    onClose: () => void;
}
