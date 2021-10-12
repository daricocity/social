import './profile.css';
import axios from 'axios';
import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import Feed from "../../components/feed/Feed";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbar from "../../components/rightbar/Rightbar";

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const username = useParams().username;
    const [user, setUser] = useState({});
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${username}`);
            setUser(res.data);
        };
        fetchUser();
    }, [username]);
    return(
        <>
            <Topbar/>
            <div className="profileContainer">
                <Sidebar/>
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img 
                                className="profileCoverImg" 
                                src={user.coverPicture ? PF + user.coverPicture : PF+'person/noCover.jpg'} alt="profileCoverImg" 
                            />
                            <img 
                                className="profileUserImg" 
                                src={user.profilePicture ? PF + user.profilePicture : PF+'person/avatar.png'} alt="profileUserImg" 
                            />
                        </div>
                        <div className="profileInfo">
                            <h4 className="profileInfoName">{user.username}</h4>
                            <span className="profileInfoDesc">{user.desc}</span>
                        </div>
                    </div>
                    <div className="profileRightBottom">
                        <Feed username={username} />
                        <Rightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default Profile;