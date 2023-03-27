import { StyledBgImage } from "@/components/BgImage";
import {
    Center,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Box,
    Text,
    Button,
    Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login.schemas";
import { iLogin } from "@/interfaces/user.interfaces";
import { useAuthContext } from "@/contexts/authContext";
import Head from "next/head";
import { StyledLink } from "@/components/Link";

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iLogin>({ resolver: yupResolver(loginSchema) });

    const { login } = useAuthContext();

    return (
        <>
            <Head>
                <title>Login</title>
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
                        gap={"24px"}
                        onSubmit={handleSubmit(login)}
                    >
                        <Flex justifyContent={"space-between"}>
                            <Text>Login</Text>
                            <StyledLink href="/register" text="Cadastrar" />
                        </Flex>
                        <FormControl isRequired isInvalid={!!errors.email}>
                            <FormLabel>Email:</FormLabel>
                            <Input
                                type={"email"}
                                placeholder={"Digite seu email"}
                                bgColor={"blackAlpha.200"}
                                color={"gray.800"}
                                focusBorderColor={errors.email ? "red.500" : "pink.400"}
                                {...register("email")}
                            />
                            {errors.email && <FormErrorMessage>{errors.email?.message}</FormErrorMessage>}
                        </FormControl>
                        <FormControl isRequired isInvalid={!!errors.password}>
                            <FormLabel>Senha:</FormLabel>
                            <Input
                                type={"password"}
                                placeholder={"Digite sua senha"}
                                bgColor={"blackAlpha.200"}
                                color={"gray.800"}
                                focusBorderColor={errors.password ? "red.500" : "pink.400"}
                                {...register("password")}
                            />
                            {errors.password && (
                                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <Button
                            type={"submit"}
                            bgColor={"pink.400"}
                            _hover={{ bgColor: "pink.300" }}
                            color={"gray.50"}
                        >
                            Entrar
                        </Button>
                    </Box>
                </Center>
            </main>
        </>
    );
}
