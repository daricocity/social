import './online.css'

const Online = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return(
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img src={PF+user.profilePicture} className="rightbarProfileImg" alt="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}

export default Online;