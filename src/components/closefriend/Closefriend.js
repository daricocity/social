import './closefriend.css';
import { Link } from 'react-router-dom';

const Closefriend = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    console.log('This is the PF: '+ PF)
    return(
        <>
            <Link to={'/profile/' + user.username} style={{textDecoration:'none', color:'#000'}}>
                <li className="sidebarFriend">
                    <img className="sidebarFriendImg" src={user.profilePicture ? PF+user.profilePicture : PF + 'person/avatar.png'} alt="" />
                    <span className="sidebarFrinedName">{user.username}</span>
                </li>
            </Link>
        </>
    )
}

export default Closefriend;