import './share.css';
import Room from '@material-ui/icons/Room';
import Label from '@material-ui/icons/Label';
import { axiosInstance } from '../../helper';
import Cancel from '@material-ui/icons/Cancel';
import PermMedia from '@material-ui/icons/PermMedia';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import EmojiEmotions from '@material-ui/icons/EmojiEmotions';

const Share = () => {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const desc = useRef();
    const [ file, setFile ] = useState(null);
    const submitHandler = async (e) => {
        e.preventDefault();
        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('file', file);
            data.append('name', filename);
            newPost.img = filename;
            try {
                await axiosInstance.post('/upload', data);
            } catch (err) {
                console.log(err)
            }
        }
        try {
            await axiosInstance.post('/posts', newPost);
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }
    return(
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img 
                        className="shareProfileImg" 
                        src={user.profilePicture ? PF + user.profilePicture : PF + 'person/avatar.png'}
                        alt="FriendPics" 
                    />
                    <input 
                        ref={desc}
                        className="shareInput" 
                        placeholder={"what's in your mind " + user.username + "?"} 
                    />
                </div>
                <hr className="shareHr"/>
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" alt="shareImg" src={URL.createObjectURL(file)} />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptionContainer">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareoptionText">Photo or Video</span>
                            <input 
                                type="file" 
                                id="file" 
                                accept=".png,.jpeg,.jpg" 
                                onChange={(e) => setFile(e.target.files[0])} 
                                style={{display:'none'}} 
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareoptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareoptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareoptionText">Feelings</span>
                        </div>
                    </div>
                    <button type="submit" className="shareButton">Share</button>
                </form>
            </div>
        </div>
    )
}

export default Share;