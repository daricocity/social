import './sidebar.css';
// import {Users} from '../../dummyData';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Lock from '@material-ui/icons/Lock';
import Chat from '@material-ui/icons/Chat';
import { logoutCall } from '../../apiCalls';
import Event from '@material-ui/icons/Event';
import Group from '@material-ui/icons/Group';
import School from '@material-ui/icons/School';
import RssFeed from '@material-ui/icons/RssFeed';
import Bookmark from '@material-ui/icons/Bookmark';
import Closefriend from '../closefriend/Closefriend';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import HelpOutline from '@material-ui/icons/HelpOutline';
import WorkOutline from '@material-ui/icons/WorkOutline';
import PlayCircleFilledOutlined from '@material-ui/icons/PlayCircleFilledOutlined';

const Sidebar = () => {
    const [users, setUsers] = useState([]);
    const {user:currentUser} = useContext(AuthContext);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const userList = await axios.get('/users/all/'+ currentUser._id);
                setUsers(userList.data.sort((u1, u2) => {
                    return new Date(u2.createdAt) - new Date(u1.createdAt);
                }));
            } catch (err) {
                console.log(err)
            }
        }
        getUsers();
    }, [currentUser._id])
    const closefriendusers = users !== null && users !== undefined && users.length > 0 && users.map((user) => (
        <Closefriend key={user.id} user={user}/>
    ))
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon" />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <Link to='/messenger' style={{textDecoration:'none', color:'#000'}}>
                        <span className="sidebarListItemText">Chats</span>
                        </Link>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                    <li className="sidebarListItem" onClick={() => logoutCall()}>
                        <Lock className="sidebarIcon" />
                        <span className="sidebarListItemText">Logout</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {closefriendusers}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar;