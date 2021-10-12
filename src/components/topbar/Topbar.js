import './topbar.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Chat from '@material-ui/icons/Chat';
import Search from '@material-ui/icons/Search';
import Person from '@material-ui/icons/Person';
import { AuthContext } from '../../context/AuthContext';
import Notifications from '@material-ui/icons/Notifications';

const Topbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user} = useContext(AuthContext);
    return(
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{textDecoration:'none'}}>
                    <span className="logo">DarSocial</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input className="searchInput" placeholder="Search for friends, post or videos" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <div className="topbarLink">Home</div>
                    <div className="topbarLink">Timeline</div>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Person />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Chat />
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <Notifications />
                        <span className="topbarIconBadge">2</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF+user.profilePicture : PF+'person/avatar.png'} alt="starpics" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
};

export default Topbar;