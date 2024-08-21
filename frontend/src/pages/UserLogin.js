import React, { useState, useContext } from 'react';
import axios from 'axios';
import cypherschoolLogo from '../public/cipher-social.jpg';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
import '../styles/UserRegister.css';
import { UserContext } from '../context/userContext';

export default function UserRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { userId, setUserId } = useContext(UserContext);
    
    const verifyToken = async (token) => {
        try {
            const response = await axios.post('https://testenivromentplatform.onrender.com/verify', { token });

            if (response.status === 200) {
                setMessage('Login successful!');
                setRedirect(true);
            } else {
                setMessage('Login failed. Please try again.');
            }
        } catch (error) {
            setMessage('Token verification failed. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://testenivromentplatform.onrender.com/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
                await verifyToken(token);
                const decodedToken = jwtDecode(token);
                const { _id } = decodedToken;
                localStorage.setItem('userId', _id);
                setUserId(_id);
            } else {
                setMessage('Login failed. Please try again.');
            }
        } catch (error) {
            setMessage('Login failed. Please try again.');
        }
    };

    if (redirect) {
        return <Navigate to="/enviromentpreview" />;
    }

    return (
        <div>
            <div className='outerContainerRegister'>
                <img className='cypherschoolLogo' src={cypherschoolLogo} alt='cypherschoolLogo' />
                <div className='registerHorLine'></div>
                <div className="signup-container">
                    <h2 style={{color: "white"}}>Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label style={{color: "white"}}>Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label style={{color: "white"}}>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Sign In</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
}
