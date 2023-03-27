import { iContactRegister } from "@/interfaces/user.interfaces";
import { contactRegisterSchema } from "@/schemas/contact.schemas";
import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { StyledInput } from "./Input";
import { StyledLink } from "./Link";
import { useForm } from "react-hook-form";
import { useContactContext } from "@/contexts/contactContext";
import { iModalCreateContatc } from "@/interfaces/pages.interfaces";

export const ModalCreateContact = ({ isOpen, onClose }: iModalCreateContatc) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<iContactRegister>({ resolver: yupResolver(contactRegisterSchema) });
    const { contactRegister } = useContactContext();
    const onSubmit = async (data: iContactRegister) => {
        await contactRegister(data, onClose);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Criar novo Contato</ModalHeader>
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
                    />
                    <StyledInput
                        label={"Sobrenome:"}
                        inputType={"text"}
                        placeholder={"Digite o sobrenome"}
                        register={register("last_name")}
                        errors={errors.last_name}
                    />
                    <StyledInput
                        label={"Email:"}
                        inputType={"email"}
                        placeholder={"Digite o email"}
                        register={register("email")}
                        errors={errors.email}
                    />
                    <StyledInput
                        label={"Celular:"}
                        inputType={"text"}
                        placeholder={"Digite o número de celular"}
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
                        Criar
                    </Button>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
