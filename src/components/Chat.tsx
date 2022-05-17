import { Flex, FormControl, Input, IconButton, VStack, Divider, Box } from "@chakra-ui/react";
import { FaPaperPlane, FaPlusSquare } from "react-icons/fa";
import ChatMessage from "./ChatMessage";

import Peer, { SfuRoom } from "skyway-js";
import React, { useEffect, useRef, useState } from "react";

const APIKEY = process.env.REACT_APP_API_KEY;

interface props {
    roomId: string;
}
interface Message {
    id: string;
    name: string;
    message: string;
}

export const Chat: React.FC<props> = ({ roomId }) => {
    const peer = useRef(new Peer({ key: APIKEY as string, debug: 3 }));
    const [room, setRoom] = useState<SfuRoom>();
    const [messages, setMessages] = useState<Array<Message>>([]);

    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState("匿名");

    const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }
    const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }
    /**
     * コンポーネントが読み込まれた際に動作
     */
    useEffect(() => {
    }, []);

    const onStart = () => {
        if (peer.current) {
            if (!peer.current.open) {
                return;
            }
            const initRoom = peer.current.joinRoom<SfuRoom>(roomId, {
                mode: "sfu"
            });

            initRoom.once("open", () => {
                console.log("入室しました");
            });

            initRoom.on("peerJoin", (peerId) => {
                console.log(peerId, "さんが入室しました");
            });

            initRoom.on("data", ({ data, src }) => {
                console.log("データを受信しました");
                console.log("data: ", data, "\nsrc:", src);
                // データをチャットの配列に追加
                setMessages([...messages, data]);
            });
            initRoom.on("peerLeave", (peerId) => {
                console.log(peerId, "さんが退出しました");
            });

            setRoom(initRoom);
        }
    }

    const sendMessage = (messageData: Message) => {
        room?.send(messageData);
    }

    const showMessage = () => {
        return (
            messages.map((v, i) => {
                return <ChatMessage key={i} id={v.id} name={v.name} message={v.message} />
            }
            )
        );
    }

    return (
        <Flex direction={"column"} maxH={"80vh"}>
            <FormControl flexGrow={0}>
                <Flex gap={2}>
                    <Input
                        id="name" type="text" placeholder={"匿名"} w={16}
                        value={userName}
                        onChange={handleUserName}
                    />
                    <Input
                        flex={1}
                        id="message" type="text" placeholder={"送るメッセージ"}
                        value={message}
                        onChange={handleMessage}
                    />
                    <IconButton
                        colorScheme="green"
                        aria-label="send message"
                        variant={"solid"}
                        icon={<FaPaperPlane />}
                        onClick={() => {
                            const willSendMessage: Message = {
                                id: peer.current.id,
                                name: userName,
                                message: message
                            }
                            setMessages([...messages, willSendMessage]);
                            sendMessage(willSendMessage);
                        }
                        }
                    />
                </Flex>
            </FormControl>
            <VStack my={2}>
            </VStack>
            <Divider flexGrow={0} my={2} />
            <Flex direction={"column-reverse"} flexGrow={1} flex={1} maxH={"60vh"} overflowY="scroll">
                {showMessage()}
            </Flex>
            <Box>
                <IconButton variant="solid" aria-label={""} icon={<FaPlusSquare />}
                    onClick={onStart}
                />
            </Box>
        </Flex>
    );
}

export default Chat;