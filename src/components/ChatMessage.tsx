import { Badge, Box, Stack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
interface props {
    id: string;
    name: string;
    message: string;
}
export const ChatMessage: React.FC<props> = (props) => {
    // make console log for enthusiast
    useEffect(() => {
        console.log(props.id, ":", props.name, ":", props.message);
    }, []);

    return (
        <Box>
            <Stack direction="row" p={2} spacing={2}>
                <Badge variant={"solid"} colorScheme={"green"}>
                    <Text fontSize="md">{props.name}</Text></Badge>
                <Text fontSize="md">{props.message}</Text>
            </Stack>
        </Box>
    );
}

export default ChatMessage;