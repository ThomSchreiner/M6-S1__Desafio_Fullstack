import {
    PhoneIcon,
    StarIcon,
    TimeIcon,
    EmailIcon,
    AddIcon,
    EditIcon,
    DeleteIcon,
    InfoIcon,
} from "@chakra-ui/icons";
import {
    Center,
    Text,
    List,
    ListItem,
    Flex,
    Input,
    Button,
    useDisclosure,
    Box,
    Spacer,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { iDashboardProps, iModalFormat } from "@/interfaces/pages.interfaces";
import { iClient } from "@/interfaces/user.interfaces";
import { StyledHeader } from "@/components/Header";
import { api } from "@/services/api";
import { StyledBgImage } from "@/components/BgImage";
import nookies from "nookies";
import Head from "next/head";
import { ModalContainer } from "@/components/Modal/modalContainer";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useContactContext } from "@/contexts/contactContext";
import { useClientContext } from "@/contexts/clientContext";

export default function Dashboard({}) {
    const [modalFormat, setModalFormat] = useState<iModalFormat>("createContact");
    const [idDeleteContact, setIdDeleteContact] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { client, getClient } = useClientContext();
    const { contacts, getContacts, setModalContact, deleteContact } = useContactContext();

    useEffect(() => {
        getClient();
        getContacts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSearch = (e: FormEvent) => {
        e.preventDefault();
        toast.error("Não implementado!");
    };

    const handdledeleteContact = async (id: string) => {
        if (idDeleteContact == id) {
            await deleteContact(idDeleteContact);
        } else {
            setIdDeleteContact(id);
            setTimeout(() => {
                setIdDeleteContact("");
            }, 1500);
        }
    };

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <ModalContainer isOpen={isOpen} onClose={onClose} modalFormat={modalFormat} />
            <StyledBgImage />
            <StyledHeader user={client} onOpen={onOpen} setModalFormat={setModalFormat} />

            <main>
                <Center mt={"40px"} flexDirection={"column"} gap={"24px"}>
                    <Flex
                        bg={"whiteAlpha.900"}
                        borderRadius="xl"
                        px={"32px"}
                        py={"14px"}
                        w={"100%"}
                        maxW={"450px"}
                        gap={"12px"}
                    >
                        <Box as={"form"} onSubmit={onSearch} display={"contents"}>
                            <Input placeholder="Pesquise um contato" focusBorderColor={"pink.400"} />
                        </Box>
                        <Button
                            color={"gray.50"}
                            bgColor={"blackAlpha.500"}
                            _hover={{ bgColor: "pink.300" }}
                            onClick={() => {
                                setModalFormat("createContact");
                                onOpen();
                            }}
                        >
                            <AddIcon />
                        </Button>
                    </Flex>
                    <List
                        bg={"whiteAlpha.900"}
                        borderRadius="xl"
                        px={"32px"}
                        py={"24px"}
                        w={"100%"}
                        maxW={"450px"}
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"24px"}
                    >
                        {!contacts ? (
                            <h1>Loading....</h1>
                        ) : !contacts.length ? (
                            <h1>Agenda vazia, adicione um contato.</h1>
                        ) : (
                            contacts.map((contact) => (
                                <ListItem key={contact.id}>
                                    <Flex
                                        bgGradient={"linear(to-r, blue.200, pink.200, pink.400)"}
                                        bgSize={"130%"}
                                        bgPos={"center"}
                                        borderRadius={"md"}
                                        align={"center"}
                                        pl={"10px"}
                                        py={"2px"}
                                        gap={"15px"}
                                    >
                                        <StarIcon boxSize={3} />
                                        <Text>Nome: {`${contact.first_name} ${contact.last_name}`}</Text>
                                        <Spacer />
                                        <Flex pr={"4px"}>
                                            <Button
                                                px={"4px"}
                                                py={"2px"}
                                                h={"unset"}
                                                minW={8}
                                                bgColor={"transparent"}
                                                onClick={() => {
                                                    setModalFormat("updateContact");
                                                    setModalContact(contact);
                                                    onOpen();
                                                }}
                                            >
                                                <EditIcon boxSize={4} />
                                            </Button>
                                            <Button
                                                px={"4x"}
                                                py={"2px"}
                                                h={"unset"}
                                                minW={8}
                                                bgColor={"transparent"}
                                                onClick={() => handdledeleteContact(contact.id)}
                                            >
                                                {idDeleteContact == contact.id ? (
                                                    <InfoIcon color={"#E31515"} boxSize={3.5} />
                                                ) : (
                                                    <DeleteIcon boxSize={3.5} />
                                                )}
                                            </Button>
                                        </Flex>
                                    </Flex>
                                    <Flex align={"center"} pl={"10px"} py={"2px"} gap={"15px"}>
                                        <EmailIcon boxSize={3} />
                                        <Text>Email: {contact.email}</Text>
                                    </Flex>
                                    <Flex align={"center"} pl={"10px"} py={"2px"} gap={"15px"}>
                                        <PhoneIcon boxSize={3} />
                                        <Text>Celular: {formatPhoneNumber(contact.phone_number)}</Text>
                                    </Flex>
                                    <Flex align={"center"} pl={"10px"} py={"2px"} gap={"15px"}>
                                        <TimeIcon boxSize={3} />
                                        <Text>
                                            Salvo em:{" "}
                                            {new Date(contact.createdAt).toLocaleString().replace(",", "")}
                                        </Text>
                                    </Flex>
                                </ListItem>
                            ))
                        )}
                    </List>
                </Center>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx);

    if (!cookies["M6_S1_Token"]) {
        return { redirect: { destination: "/login", permanent: false } };
    }

    return { props: {} };
};

const formatPhoneNumber = (phone_number: string) => {
    let array = phone_number.split("");
    array.splice(0, 0, "(");
    if (phone_number.length == 10) {
        array.splice(3, 0, ") 9");
        array.splice(8, 0, "-");
    } else {
        array.splice(3, 0, ") ");
        array.splice(9, 0, "-");
    }
    return array.join("");
};
