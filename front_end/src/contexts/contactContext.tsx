import { iContactContext, iContextProps } from "@/interfaces/contexts.interfaces";
import { iContact, iContactRegister } from "@/interfaces/user.interfaces";
import { api } from "@/services/api";
import { createContext, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { parseCookies } from "nookies";

const ContactContext = createContext<iContactContext>({} as iContactContext);

export const ContactProvider = ({ children }: iContextProps) => {
    const contactRegister = async (body: iContactRegister, onClose: () => void) => {
        try {
            const cookies = parseCookies();

            api.defaults.headers.authorization = `Bearer ${cookies["M6_S1_Token"]}`;
            const { data } = await api.post<iContact>("/contacts", body);

            toast.success("Contato adicionado com sucesso!");
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    return <ContactContext.Provider value={{ contactRegister }}>{children}</ContactContext.Provider>;
};

export const useContactContext = () => useContext(ContactContext);
