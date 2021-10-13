import './post.css';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../helper';
import MoreVert from '@material-ui/icons/MoreVert';
import likeImg from '../../assets/icons/w-icon-3.png';
import love from '../../assets/icons/price-icon-2.png';
import { AuthContext } from '../../context/AuthContext';
import { useState, useEffect, useContext } from 'react';

const Post = ({post}) => {
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [isLiked, setIsLiked] = useState(false);
    const [like, setLike] = useState(post.likes.length);
    const { user:currentUser } = useContext(AuthContext); // use 'user' as 'current user'

    const likeHandler = () => {
        try {
            axiosInstance.put('posts/' + post._id + '/like', {userId:currentUser._id})
        } catch (error) {
            
        }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    }
    
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axiosInstance.get(`/users?userId=${post.userId}`);
            setUser(res.data)
        };
        fetchUser();
    }, [post.userId]);
    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`}>
                            <img 
                                className="postProfileImg" 
                                src={user.profilePicture ? PF + user.profilePicture : PF + 'person/avatar.png'} alt="" 
                            />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post.desc}</span>
                    <img src={PF+post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={likeImg} alt="likimg" className="ilkeIcon" onClick={likeHandler} />
                        <img src={love} alt="likimg" className="ilkeIcon" onClick={likeHandler} />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comment</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Post;