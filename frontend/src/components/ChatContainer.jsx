import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore.js";
import ChatHeader from "./ChatHeader.jsx";
import MessageInput from "./MessageInput.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";
import { useRef } from "react";

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        listenForMessages,
        unsubscribeFromChat,
    } = useChatStore();

    const messageEndRef = useRef(null);

    const { authUser } = useAuthStore();

    useEffect(() => {
        getMessages(selectedUser._id);

        listenForMessages();

        return () => {
            unsubscribeFromChat();
        };
    }, [selectedUser._id]);

    useEffect(() => {
        if (messageEndRef.current && messages) {
            messageEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    if (isMessagesLoading) {
        return (
            <div className="flex flex-1 flex-col overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((message) => {
                    return (
                        <div
                            key={message._id}
                            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                        >
                            <div className="chat-image avatar">
                                <div className="size-10 rounded-full border">
                                    <img
                                        src={
                                            message.senderId === authUser._id
                                                ? authUser.profilePic ||
                                                  "/avatar.png"
                                                : selectedUser.profilePic ||
                                                  "/avatar.png"
                                        }
                                    />
                                </div>
                            </div>
                            <div
                                className={`chat-bubble rounded-2xl ${
                                    message.senderId === authUser._id
                                        ? "chat-bubble-primary text-primary-content"
                                        : "bg-base-200 text-base-content"
                                }`}
                            >
                                {message.image && (
                                    <img
                                        src={message.image}
                                        alt="attachment"
                                        className="max-w-[200px] rounded-md mb-2"
                                    />
                                )}
                                {message.text && <p>{message.text}</p>}
                                <div
                                    className={
                                        message.senderId === authUser._id
                                            ? "text-end"
                                            : undefined
                                    }
                                >
                                    <time className="text-xs opacity-50">
                                        {message.createdAt
                                            .split("T")[1]
                                            .slice(0, 5)}
                                    </time>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <div ref={messageEndRef}></div>
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
