import { iContactContext, iContextProps } from "@/interfaces/contexts.interfaces";
import { iContact, iContactRegister, iContactUpdate } from "@/interfaces/user.interfaces";
import { api } from "@/services/api";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { parseCookies } from "nookies";

const ContactContext = createContext<iContactContext>({} as iContactContext);

export const ContactProvider = ({ children }: iContextProps) => {
    const [contacts, setContacts] = useState<iContact[] | null>(null);
    const [modalContact, setModalContact] = useState<iContact | null>(null);

    const getContacts = async () => {
        try {
            const cookies = parseCookies();

            api.defaults.headers.authorization = `Bearer ${cookies["M6_S1_Token"]}`;
            const { data } = await api.get<iContact[]>("/contacts");
            setContacts(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const createContact = async (body: iContactRegister, onClose: () => void) => {
        try {
            const cookies = parseCookies();

            api.defaults.headers.authorization = `Bearer ${cookies["M6_S1_Token"]}`;
            const { data } = await api.post<iContact>("/contacts", body);
            setContacts(contacts ? [...contacts, data] : [data]);
            toast.success("Contato adicionado com sucesso!");
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const updateContact = async (body: iContactUpdate, onClose: () => void) => {
        try {
            const cookies = parseCookies();

            api.defaults.headers.authorization = `Bearer ${cookies["M6_S1_Token"]}`;
            const { data } = await api.patch<iContact>(`/contacts/${modalContact?.id}`, body);
            setContacts(contacts!.map((contact) => (contact.id == data.id ? data : contact)));
            toast.success("Contato atualizado com sucesso!");
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const deleteContact = async (id: string) => {
        try {
            const cookies = parseCookies();

            api.defaults.headers.authorization = `Bearer ${cookies["M6_S1_Token"]}`;
            await api.delete(`/contacts/${id}`);
            setContacts(contacts!.filter((contact) => contact.id !== id));
            toast.success("Contato deletado com sucesso!");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    return (
        <ContactContext.Provider
            value={{
                contacts,
                modalContact,
                setModalContact,
                getContacts,
                createContact,
                updateContact,
                deleteContact,
            }}
        >
            {children}
        </ContactContext.Provider>
    );
};

export const useContactContext = () => useContext(ContactContext);
