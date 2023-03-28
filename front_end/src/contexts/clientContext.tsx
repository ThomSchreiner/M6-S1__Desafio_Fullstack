import { iClientContext, iContextProps } from "@/interfaces/contexts.interfaces";
import { iClient, iClientRegister, iClientUpdate } from "@/interfaces/user.interfaces";
import { api } from "@/services/api";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthContext } from "./authContext";
import { parseCookies } from "nookies";

const ClientContext = createContext<iClientContext>({} as iClientContext);

export const ClientProvider = ({ children }: iContextProps) => {
    const [client, setClient] = useState<iClient | null>(null);
    const { login } = useAuthContext();

    const getClient = async () => {
        try {
            const cookies = parseCookies();

            api.defaults.headers.authorization = `Bearer ${cookies["M6_S1_Token"]}`;
            const { data } = await api.get<iClient>("/clients/profile");

            setClient(data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const clientRegister = async (body: iClientRegister) => {
        try {
            await api.post<iClient>("/clients", body);

            toast.success("Conta criada com sucesso!");
            await login({ email: body.email, password: body.password });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    const updateClient = async (body: iClientUpdate, onClose: () => void) => {
        try {
            const { data } = await api.patch<iClient>(`/clients/${client?.id}`, body);
            setClient(data);

            toast.success("Usuario atualizado com sucesso!");
            onClose();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message);
            }
        }
    };

    return (
        <ClientContext.Provider value={{ client, getClient, clientRegister, updateClient }}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClientContext = () => useContext(ClientContext);
