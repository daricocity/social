import './login.css';
import {Link} from 'react-router-dom';
import { useRef, useContext } from 'react';
import { loginCall } from '../../apiCalls';
import { CircularProgress } from '@material-ui/core';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const email = useRef();
    const password = useRef();
    const {isFetching, dispatch} = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall({
            email: email.current.value, 
            password: password.current.value
        }, dispatch);
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
                        <button className="loginButton" type="submit" disabled={isFetching}>
                            {isFetching ? <CircularProgress color="#ffffff" size="20px" /> : 'Login'}
                        </button>
                        <span className="loginForgot">Forgot password?</span>
                        <button className="loginRegisterButton"><Link to="/register" style={{color:"#fff"}}>Create a new account</Link></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;