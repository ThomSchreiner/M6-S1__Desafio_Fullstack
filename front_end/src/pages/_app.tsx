import { AuthProvider } from "@/contexts/authContext";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <AuthProvider>
                <ToastContainer autoClose={1500} />
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
}
