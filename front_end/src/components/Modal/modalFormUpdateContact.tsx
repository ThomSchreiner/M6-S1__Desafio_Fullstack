import { iContactUpdate } from "@/interfaces/user.interfaces";
import { contactUpdateSchema } from "@/schemas/contact.schemas";
import { Button, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledInput } from "../Input";
import { useForm } from "react-hook-form";
import { useContactContext } from "@/contexts/contactContext";
import { iModalForm } from "@/interfaces/pages.interfaces";

export const ModalFormUpdateContact = ({ onClose }: iModalForm) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iContactUpdate>({ resolver: yupResolver(contactUpdateSchema) });

    const { updateContact, modalContact } = useContactContext();

    const onSubmit = async (data: iContactUpdate) => {
        if (!Object.keys(data).length) {
            onClose();
        } else {
            await updateContact(data, onClose);
        }
    };

    return (
        <ModalContent>
            <ModalHeader>Atualizar Contato</ModalHeader>
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
                    placeholder={"Digite o nome"}
                    register={register("first_name")}
                    errors={errors.first_name}
                    partial={true}
                    value={modalContact?.first_name}
                />
                <StyledInput
                    label={"Sobrenome:"}
                    inputType={"text"}
                    placeholder={"Digite o sobrenome"}
                    register={register("last_name")}
                    errors={errors.last_name}
                    partial={true}
                    value={modalContact?.last_name}
                />
                <StyledInput
                    label={"Email:"}
                    inputType={"email"}
                    placeholder={"Digite o email"}
                    register={register("email")}
                    errors={errors.email}
                    partial={true}
                    value={modalContact?.email}
                />
                <StyledInput
                    label={"Celular:"}
                    inputType={"text"}
                    placeholder={"Digite o número de celular"}
                    register={register("phone_number")}
                    errors={errors.phone_number}
                    partial={true}
                    value={modalContact?.phone_number}
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
