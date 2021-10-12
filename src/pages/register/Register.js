import './register.css'
import axios from 'axios';
import { useRef } from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router';

const Register = () => {
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    const history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if(confirmPassword.current.value !== password.current.value){
            password.current.setCustomValidity("Password don't match!")
        } else {
            const user = {
                email: email.current.value,
                username: username.current.value,
                password: password.current.value,
            }
            try {
                await axios.post('/auth/register', user);
                history.push('/login');

            } catch (err) {
                console.log(err)
            }
        }
    }
    return(
        <div className="loginContainer">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">DarSocial</h3>
                    <span className="loginDesc">Connect with friends and the world around you on Darsocial</span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="loginInput" 
                            ref={username} 
                            required 
                        />
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="loginInput" 
                            ref={email} 
                            required 
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="loginInput" 
                            ref={password} 
                            required 
                            minLength="6"
                        />
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            className="loginInput" 
                            ref={confirmPassword} 
                            required 
                            minLength="6"
                        />
                        <button className="loginButton" type="submit">Sign Up</button>
                        <button className="loginRegisterButton"><Link to="/login" style={{color:"#fff"}}>Log into Account</Link></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;