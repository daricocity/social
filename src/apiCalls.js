import axios from 'axios';

// LOGIN
export const loginCall = async (userCredentials, dispatch) => {
    dispatch({
        type: 'LOGIN_START'
    });
    try {
        const res = await axios.post('auth/login', userCredentials);
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: res.data
        })
    } catch(err) {
        dispatch({
            type: 'LOGIN_FAILURE',
            payload: err
        })
    }
}

// LOGOUT
export const logoutCall = () => {
    if(localStorage.getItem('user')){
        localStorage.removeItem('user');
    }
    window.location.href = "/login";
}

