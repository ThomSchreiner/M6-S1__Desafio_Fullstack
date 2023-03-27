import { PhoneIcon, StarIcon, TimeIcon, EmailIcon, AddIcon } from "@chakra-ui/icons";
import { Center, Text, List, ListItem, Flex, Input, Button, useDisclosure, Box } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { iDashboardProps } from "@/interfaces/pages.interfaces";
import { iClient, iContact } from "@/interfaces/user.interfaces";
import { StyledHeader } from "@/components/Header";
import { api } from "@/services/api";
import { StyledBgImage } from "@/components/BgImage";
import nookies from "nookies";
import Head from "next/head";
import { ModalCreateContact } from "@/components/modalCreateContact";
import { FormEvent } from "react";
import { toast } from "react-toastify";

export default function Dashboard({ contacts, client }: iDashboardProps) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onSearch = (e: FormEvent) => {
        e.preventDefault();
        toast.error("Não implementado!");
    };

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>
            <StyledBgImage />
            <StyledHeader userName={client.first_name} />
            <main>
                <ModalCreateContact isOpen={isOpen} onClose={onClose} />
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
                            onClick={onOpen}
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
                        {contacts.map((contact) => (
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
                        ))}
                    </List>
                </Center>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<iDashboardProps> = async (ctx) => {
    const cookies = nookies.get(ctx);

    if (!cookies["M6_S1_Token"]) {
        return { redirect: { destination: "/login", permanent: false } };
    }

    api.defaults.headers.authorization = `Bearer ${cookies["M6_S1_Token"]}`;
    const { data: contacts } = await api.get<iContact[]>("/contacts");
    const { data: client } = await api.get<iClient>("/clients/profile");
    return { props: { contacts, client } };
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
