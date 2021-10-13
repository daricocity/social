import './chatOnline.css';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../helper';

const ChatOnline = ({onlineUsers, currentId, setCurrentChat}) => {
    const [friends, setFriends] = useState([]);
    const [onlineFriends, setOnlineFriends] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // GET FRIENDS
    useEffect(() => {
        const getFrineds = async () => {
            const res = await axiosInstance.get("/users/friends/" + currentId);
            setFriends(res.data);
        };
        getFrineds();
    }, [currentId]);

    // SET ONLINE FRIENDS
    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axiosInstance.get(`/conversations/find/${currentId}/${user._id}`);
            setCurrentChat(res.data);
        } catch (err) {
            console.log(err)
        }
    }

    return(
        <div className="chatOnline">
            {onlineFriends.map((o) => (
                <div className="chatOnlineFriend" onClick={() => handleClick(o)} key={o?._id}>
                    <div className="chatOnlineImgContainer">
                        <img 
                            src={o?.profilePicture ? PF + o.profilePicture : PF+'person/avatar.png'} 
                            alt="chatOnlineImg" 
                            className="chatOnlineImg" 
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.username}</span>
                </div>
            ))}
        </div>
    )
};

export default ChatOnline;