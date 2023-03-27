import { iClientContext, iContextProps } from "@/interfaces/contexts.interfaces";
import { iClient, iClientRegister } from "@/interfaces/user.interfaces";
import { api } from "@/services/api";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthContext } from "./authContext";

const ClientContext = createContext<iClientContext>({} as iClientContext);

export const ClientProvider = ({ children }: iContextProps) => {
    const [client, setClient] = useState<iClient | null>(null);
    const { login } = useAuthContext();

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

    return (
        <ClientContext.Provider value={{ clientRegister, client, setClient }}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClientContext = () => useContext(ClientContext);
