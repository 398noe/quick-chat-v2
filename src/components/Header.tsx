import { Box, Button, Flex, Stack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { FaGithub } from "react-icons/fa";

export const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Box pos={"fixed"} zIndex={100} w={"full"} bg={useColorModeValue("white", "gray.900")}>
            <Flex
                h={16}
                px={4}
                alignItems={"center"}
                justifyContent={"space-between"}
                borderBottom={1}
                borderStyle={"solid"}
                borderColor={useColorModeValue("gray.200", "gray.800")}
            >
                <Box px={2}>
                    <Button as="a" href="/" variant="ghost"><Text fontSize={24} fontWeight={700}>Quick Chat</Text></Button>
                </Box>
                <Flex alignItems={'center'}>
                    <Stack direction={'row'} spacing={2}>
                        <Button variant="ghost" as="a" href="https://github.com/398noe/quick-chat-v2"><FaGithub /></Button>
                        <Button onClick={toggleColorMode} variant="ghost">
                            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        </Button>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
}

export default Header;