import { iStyledLink } from "@/interfaces/pages.interfaces";
import { Box } from "@chakra-ui/react";
import Link from "next/link";

export const StyledLink = ({ href, text }: iStyledLink) => {
    return (
        <Link href={href}>
            <Box
                px={"14px"}
                py={"2px"}
                borderRadius={"md"}
                color={"gray.50"}
                bgColor={"blackAlpha.500"}
                _hover={{ bgColor: "blackAlpha.600" }}
            >
                {text}
            </Box>
        </Link>
    );
};
