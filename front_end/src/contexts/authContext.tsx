import { iLogin, iLoginResponse } from "@/interfaces/user.interfaces";
import { api } from "@/services/api";
import { setCookie, destroyCookie } from "nookies";
import { createContext, ReactNode, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

interface iContextProps {
    children: ReactNode;
}

interface iAuthContext {
    login: (body: iLogin) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<iAuthContext>({} as iAuthContext);

export const AuthProvider = ({ children }: iContextProps) => {
    const router = useRouter();
    const login = async (body: iLogin) => {
        try {
            const { data } = await api.post<iLoginResponse>("/login", body);
            setCookie(null, "M6_S1_Token", data.token);
            toast.success("Login realizado com sucesso!");
            router.push("/dashboard");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message: string = error.response?.data.message;
                if (message.includes("incorrect")) {
                    toast.error("Email ou senha incorretos");
                }
            }
        }
    };

    const logout = () => {
        destroyCookie(null, "M6_S1_Token");
        router.push("/login");
    };

    return <AuthContext.Provider value={{ login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);