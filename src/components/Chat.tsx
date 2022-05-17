import { Flex, FormControl, Input, IconButton, VStack, Divider, Box } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import AlertMessage from "./AlertMessage";
import ChatMessage from "./ChatMessage";

interface props {

}

export const Chat: React.FC<props> = (props) => {
    return (
        <Flex direction={"column"} maxH={"80vh"}>
            <FormControl flexGrow={0}>
                <Flex gap={2}>
                    <Input
                        id="name" type="text" placeholder={"匿名"} w={16} />
                    <Input
                        flex={1}
                        id="message" type="text" placeholder={"送るメッセージ"} />
                    <IconButton
                        colorScheme="green"
                        aria-label="send message"
                        variant={"solid"}
                        icon={<FaPaperPlane />}
                    />
                </Flex>
            </FormControl>
            <VStack my={2}>
            </VStack>
            <Divider flexGrow={0} my={2} />
            <Flex direction={"column-reverse"} flexGrow={1} flex={1} maxH={"60vh"} overflowY="scroll">
                <ChatMessage id={"noe"} name={"さきゅばのえ"} message={"テストメッセージ"}/>
            </Flex>
            <Box>
            </Box>
        </Flex>
    );
}

export default Chat;