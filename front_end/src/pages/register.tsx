import Head from "next/head";
import { StyledBgImage } from "@/components/BgImage";
import {
    Center,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Box,
    Text,
    Button,
    Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { iClientRegister } from "@/interfaces/user.interfaces";
import { clientRegisterSchema } from "@/schemas/client.schemas";
import { useClientContext } from "@/contexts/clientContext";
import { StyledInput } from "@/components/Input";
import Link from "next/link";
import { StyledLink } from "@/components/Link";

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iClientRegister>({ resolver: yupResolver(clientRegisterSchema) });

    const { clientRegister } = useClientContext();

    return (
        <>
            <Head>
                <title>Register</title>
            </Head>
            <StyledBgImage />
            <main>
                <Center minH={"70vh"}>
                    <Box
                        as={"form"}
                        w={"100%"}
                        maxW={"450px"}
                        bg={"whiteAlpha.900"}
                        borderRadius="xl"
                        px={"32px"}
                        py={"24px"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"16px"}
                        onSubmit={handleSubmit(clientRegister)}
                    >
                        <Flex justifyContent={"space-between"}>
                            <Text>Cadastrar</Text>
                            <StyledLink href="/" text="Login" />
                        </Flex>
                        <StyledInput
                            label={"Nome:"}
                            inputType={"text"}
                            placeholder={"Digite seu nome"}
                            register={register("first_name")}
                            errors={errors.first_name}
                        />
                        <StyledInput
                            label={"Sobrenome:"}
                            inputType={"text"}
                            placeholder={"Digite seu sobrenome"}
                            register={register("last_name")}
                            errors={errors.last_name}
                        />
                        <StyledInput
                            label={"Email:"}
                            inputType={"email"}
                            placeholder={"Digite seu email"}
                            register={register("email")}
                            errors={errors.email}
                        />
                        <StyledInput
                            label={"Senha:"}
                            inputType={"password"}
                            placeholder={"Digite sua senha"}
                            register={register("password")}
                            errors={errors.password}
                        />
                        <StyledInput
                            label={"Celular:"}
                            inputType={"text"}
                            placeholder={"Digite seu número de celular"}
                            register={register("phone_number")}
                            errors={errors.phone_number}
                        />

                        <Button
                            type={"submit"}
                            mt={"16px"}
                            bgColor={"pink.400"}
                            _hover={{ bgColor: "pink.300" }}
                            color={"gray.50"}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Center>
            </main>
        </>
    );
}
