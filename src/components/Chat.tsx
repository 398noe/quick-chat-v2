import { Flex, FormControl, Input, IconButton, VStack, Divider } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";
import ChatMessage from "./ChatMessage";

import Peer, { SfuRoom } from "skyway-js";
import React, { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import AlertMessage from "./AlertMessage";

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
    const peer = useRef(new Peer({ key: APIKEY as string }));
    const [room, setRoom] = useState<SfuRoom>();
    const [messages, setMessages] = useState<Array<Message>>([]);

    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState("");

    const [buttonDisable, setButtonDisable] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            message: ""
        }
    });

    const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }
    const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    }
    const isFirst = useRef(false);

    useEffect(() => {
        if (isFirst.current === false) {
            onStart();
            isFirst.current = true;
        }
    // eslint-disable-next-line
    }, []);

    useEffect(() => {
        /**
         * 10秒後にDisableを解除
         */
        if (buttonDisable === true) {
            sleep(10000).then(r => {
                setButtonDisable(false);
            });
        }
    }, [buttonDisable]);

    const sleep = (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const onStart = () => {
        if (peer.current) {
            peer.current.once("open", () => {
                console.log("Peer is open!!");
                console.log("peer is ready. joining room");

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
                    setMessages((prev) => {
                        return [...prev, data]
                    });
                });
                initRoom.on("peerLeave", (peerId) => {
                    console.log(peerId, "さんが退出しました");
                });

                initRoom.on("close", () => {
                    onEnd();
                });

                initRoom.on("error", () => {
                    console.error();
                    onEnd();
                });
                setRoom(initRoom);
            });

            if (!peer.current.open) {
                console.log("peer is not ready.");
                return;
            }
        }
    }

    const onEnd = () => {
        room?.close();
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
                        {...register("username", { required: true, maxLength: 20 })}
                        id="name" type="text" placeholder={"匿名"} w={16}
                        value={userName}
                        onChange={handleUserName}
                    />
                    <Input
                        {...register("message", { required: true, maxLength: 100 })}
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
                        isDisabled={buttonDisable}
                        onClick={handleSubmit((data) => {
                            const willSendMessage: Message = {
                                id: peer.current.id,
                                name: userName,
                                message: message
                            }
                            sendMessage(willSendMessage);

                            // ボタンを10秒間disableに
                            setButtonDisable((prev) => {
                                return (!prev);
                            })
                            setMessages((prev) => {
                                return [...prev, willSendMessage]
                            });
                        })}
                    />
                </Flex>
            </FormControl>
            <VStack my={2}>
                {
                    (errors.message) && (
                        <AlertMessage title="送信エラー" description="メッセージは100文字以下で入力してください" />
                    )
                }
                {
                    (errors.username) && (
                        <AlertMessage title="送信エラー" description="ユーザー名は20文字以下で入力してください" />
                    )

                }
            </VStack>
            <Divider flexGrow={0} my={2} />
            <Flex direction={"column-reverse"} flexGrow={1} flex={1} maxH={"60vh"} overflowY="scroll">
                {showMessage()}
            </Flex>
        </Flex>
    );
}

export default Chat;
