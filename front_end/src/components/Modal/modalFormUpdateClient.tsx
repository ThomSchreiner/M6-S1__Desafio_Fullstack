import { iClientUpdate } from "@/interfaces/user.interfaces";
import { Button, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledInput } from "../Input";
import { useForm } from "react-hook-form";
import { iModalForm } from "@/interfaces/pages.interfaces";
import { clientUpdateSchema } from "@/schemas/client.schemas";
import { useClientContext } from "@/contexts/clientContext";

export const ModalFormUpdateClient = ({ onClose }: iModalForm) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iClientUpdate>({ resolver: yupResolver(clientUpdateSchema) });

    const { client, updateClient } = useClientContext();

    const onSubmit = async (data: iClientUpdate) => {
        if (!Object.keys(data).length) {
            onClose();
        } else {
            await updateClient(data, onClose);
        }
    };

    return (
        <ModalContent>
            <ModalHeader>Atualizar Usuario</ModalHeader>
            <ModalCloseButton />
            <ModalBody
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
                onSubmit={handleSubmit(onSubmit)}
            >
                <StyledInput
                    label={"Nome:"}
                    inputType={"text"}
                    placeholder={"Digite seu nome"}
                    register={register("first_name")}
                    errors={errors.first_name}
                    value={client?.first_name}
                    partial={true}
                />
                <StyledInput
                    label={"Sobrenome:"}
                    inputType={"text"}
                    placeholder={"Digite seu sobrenome"}
                    register={register("last_name")}
                    errors={errors.last_name}
                    value={client?.last_name}
                    partial={true}
                />
                <StyledInput
                    label={"Email:"}
                    inputType={"email"}
                    placeholder={"Digite seu email"}
                    register={register("email")}
                    errors={errors.email}
                    value={client?.email}
                    partial={true}
                />
                <StyledInput
                    label={"Senha:"}
                    inputType={"password"}
                    placeholder={"Digite sua senha"}
                    register={register("password")}
                    errors={errors.password}
                    partial={true}
                />
                <StyledInput
                    label={"Celular:"}
                    inputType={"text"}
                    placeholder={"Digite seu número de celular"}
                    register={register("phone_number")}
                    errors={errors.phone_number}
                    value={client?.phone_number}
                    partial={true}
                />

                <Button
                    type={"submit"}
                    mt={"16px"}
                    bgColor={"pink.400"}
                    _hover={{ bgColor: "pink.300" }}
                    color={"gray.50"}
                >
                    Atualizar
                </Button>
            </ModalBody>
        </ModalContent>
    );
};
