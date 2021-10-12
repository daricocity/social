import './rightbar.css';
import axios from 'axios';
import Online from '../online/Online';
import { Users } from '../../dummyData';
import { Link } from 'react-router-dom';
import Add from '@material-ui/icons/Add';
import Ad from '../../assets/post/g2.jpg';
import Remove from '@material-ui/icons/Remove';
import birthday from '../../assets/icons/02.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Rightbar = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const {user:currentUser, dispatch} = useContext(AuthContext);
    const [followed, setFollowed] = useState(currentUser.followings.includes(user?._id));

    // GET FRIENDS
    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get('/users/friends/'+ user._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        }
        getFriends();
    }, [user])

    const onlineusers = Users !== null && Users !== undefined && Users.length > 0 && Users.map((user) => (
        <Online key={user.id} user={user} />
    ))

    // HANDLE CLICK TO FOLLOW
    const followHandler = async () => {
        try {
            if(followed){
                await axios.put('/users/' + user._id + '/unfollow', {userId:currentUser._id});
                dispatch({
                    type: 'UNFOLLOW',
                    payload:currentUser._id
                });
            } else {
                await axios.put('/users/' + user._id + '/follow', {userId:currentUser._id});
                dispatch({
                    type: 'FOLLOW',
                    payload:currentUser._id
                });
            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed)
    }

    const HomeRightbar = () => {
        return(
            <>
                <div className="birthdayContainer">
                    <img src={birthday} alt="birthdayImg" className="birthdayImg"/>
                    <span className="birthdayText"><b>James Brown</b> and <b>3 other friends</b> have birthday today</span>
                </div>
                <img src={Ad} alt="rightbarAd" className="rightbarAd" />
                <h4 className="rightbarTitle">Online Friend</h4>
                <ul className="rightbarFriendList">
                    {onlineusers}
                </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return(
            <>
                {user.username !== currentUser.username && (
                    <button className="rightbarFollowedButton" onClick={followHandler}>
                        {followed ? 'Unfollow' : 'Follow'}
                        {followed ? <Remove/> : <Add/>}
                    </button>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : ' - '}</span>
                    </div>
                </div>

                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {friends.map((friend) => (
                        <Link to={'/profile/' + friend.username} style={{textDecoration:'none'}}>
                            <div className="rightbarFollowing">
                                <img 
                                    className="rightbarFollowingImg" 
                                    src={friend.profilePicture ? PF + friend.profilePicture : PF + 'person/avatar.png'} 
                                    alt="rightbarFollowingImg"
                                />
                                <span className="rightbarFollowingName">{friend.username}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        )
    }
    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                {user ? <ProfileRightbar/> : <HomeRightbar/>}
            </div>
        </div>
    )
}

export default Rightbar;