import { Flex, Menu, MenuButton, MenuList, MenuItem, Heading, Text, Button } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { iStyledHeader } from "@/interfaces/pages.interfaces";
import style from "@/styles/header.module.css";
import { useAuthContext } from "@/contexts/authContext";

export const StyledHeader = ({ userName }: iStyledHeader) => {
    const { logout } = useAuthContext();

    return (
        <header style={{ position: "relative" }}>
            <Flex
                bgColor={"blackAlpha.400"}
                color={"gray.50"}
                py={"10px"}
                px={"20px"}
                justifyContent={"center"}
            >
                <Heading
                    as={"h1"}
                    fontSize={"3xl"}
                    w={"100%"}
                    maxW={"450px"}
                    py={"5px"}
                    textAlign={"center"}
                    color={"gray.50"}
                >
                    Lista de Contatos
                </Heading>
                <Menu>
                    <MenuButton pos={"absolute"} right={"20px"} top={"0"} h={"100%"}>
                        {userName}
                    </MenuButton>
                    <MenuList
                        bgColor={"blackAlpha.500"}
                        border={"none"}
                        boxShadow={"md"}
                        mt={"-8px"}
                        minW={"32"}
                    >
                        <MenuItem className={style.menuHover} onClick={logout} bgColor={"blackAlpha.400"}>
                            <Text mr={"5px"}>Sair</Text>
                            <ArrowForwardIcon />
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Flex>
        </header>
    );
};
