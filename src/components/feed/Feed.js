import './feed.css';
import Post from '../post/Post';
import Share from '../share/Share';
import { axiosInstance } from '../../helper';
import { useState, useEffect, useContext } from 'react'; 
import { AuthContext } from '../../context/AuthContext';

const Feed = ({username}) => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);
    useEffect(() => {
        const fetchPost = async () => {
            const res = username 
            ? await axiosInstance.get('/posts/profile/' + username) 
            : await axiosInstance.get('/posts/timeline/' + user._id)
            setPosts(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            }))
        };
        fetchPost();
    }, [username, user._id]);
    const post = posts !== null && posts !== undefined && posts.length > 0 && posts.map((p) => (
        <Post key={p._id} post={p} />
    ))
    return(
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share/>}
                {post}
            </div>
        </div>
    )
};

export default Feed;