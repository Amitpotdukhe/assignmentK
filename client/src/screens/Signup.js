import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './login.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';

const SignupScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [jwt, setJwt] = useState(null);
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // console.log('Updated Cookie Value:', jwt);
        // Cookies.set("userJwt", jwt);
        if (flag) {
            console.log("navigate");
            navigate("/login")
        } else {

            setIsError(true)
        }

    }, [jwt, flag]);



    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(!loading)
        console.log('Username:', username);
        console.log('Password:', password);

        const API = 'https://posts-api-an9e.onrender.com/users/signup';

        try {
            const response = await axios.post(API, { username, password });
            console.log(response);

            // setJwt(response.data.token);

            if (response?.status === 201) {

                setFlag(true)
            }
            // response?.status !== 200 ? setIsError(true) : setIsError(false)
            // response?.status !== 200 && setSuccess(false);
            // console.log('Your Cookie Value:', response.data.token);


        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>

            {loading && <h3>Loading...</h3>}
            {/* {flag ? <h3>Something went wrong.... try again</h3> : <>test</>} */}
            <br />
            <form onSubmit={handleFormSubmit}>
                <h2>Create new account</h2>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <br />

                <button className='btn' type="submit">Signup</button>
            </form>
        </div>
    );
};

export default SignupScreen;
