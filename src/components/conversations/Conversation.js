import axios from 'axios';
import './conversation.css';
import { useEffect, useState } from 'react';

const Conversation = ({conversation, currentUser}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [ user, setUser ] = useState(null);
    useEffect(() => {
        // looking for our friend
        const friendId = conversation.members.find((m) => m !== currentUser._id);
        const getUser = async () => {
            try {
                const res = await axios("/users?userId=" + friendId);
                console.log(res)
                setUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [currentUser, conversation])
    return(
        <div className="conversation">
            <img 
                className="conversationImg" 
                src={user?.profilePicture ? PF + user.profilePicture : PF + 'person/avatar.png'}  
                alt="conversationImg" 
            />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}

export default Conversation