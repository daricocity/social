import './messenger.css';
import {io} from 'socket.io-client';
import { axiosInstance } from '../../helper';
import Topbar from '../../components/topbar/Topbar';
import Message from '../../components/message/Message';
import { AuthContext } from '../../context/AuthContext';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { useContext, useEffect, useRef, useState } from 'react';
import Conversation from '../../components/conversations/Conversation';

const Messenger = () => {
    const socket = useRef();
    const scrollRef = useRef();
    const {user} = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);

    useEffect(() => {
        socket.current = io("ws://localhost:8900");

        // Get Messages from socket server
        socket.current.on("getMessage", data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])

    useEffect(() => {
        // send to server
        socket.current.emit("addUser", user._id); 
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(user.followings.filter((f) => users.some((u) => u.userId === f)));
        })
    }, [user])

    // GET CONVERSATIONS
    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axiosInstance.get("/conversations/" + user._id);
                setConversations(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getConversations();
    }, [user._id])
    
    // GET MESSAGES
    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axiosInstance.get("/messages/" + currentChat?._id);
                setMessages(res.data);
            } catch (err) {
                console.log(err)
            }
        }
        getMessages();
    }, [currentChat]);

    // CREATE NEW MESSAGE
    const handleSubmit = async(e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        }

        // Send message to socket server
        const receiverId = currentChat.members.find(member => member !== user._id)
        socket.current.emit("sendMessage", {
            senderId: user._id, 
            receiverId, 
            text: newMessage,
        })

        try {
            const res = await axiosInstance.post("/messages", message);
            setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err)
        }
    }

    // Scroll Chat to the last Message
    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    return(
        <>
            <Topbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for Friends" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div onClick={() => setCurrentChat(c)}>
                                <Conversation key={c._id} conversation={c} currentUser={user} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                            <div className="chatBoxTop">
                                {messages.map((m) => (
                                    <div ref={scrollRef}>
                                        <Message key={m._id} message={m} own={m.sender === user._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea 
                                    className="chatMessageInput" 
                                    placeholder="write something..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                            </div>
                            </>
                        ) : (
                            <span className="noCoversationText">Open a conversation to start a chat.</span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Messenger;