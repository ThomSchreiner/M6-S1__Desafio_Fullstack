import { Box, Img } from "@chakra-ui/react";

export const StyledBgImage = () => {
    return (
        <Box pos={"fixed"} h={"100vh"} zIndex={-1}>
            <Img
                src="beauty_bg.jpg"
                filter={"blur(3px)"}
                h={"100vh"}
                w={"100vw"}
                objectFit={"cover"}
                transform={"scale(2)"}
            />
        </Box>
    );
};
