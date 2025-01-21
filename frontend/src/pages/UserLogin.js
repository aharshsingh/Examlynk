import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
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

    useEffect(() => {
        console.log('Updated userId:', userId);
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://examlynk.onrender.com/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data;
                console.log('Received token:', token); 

                localStorage.setItem('UserToken', token);
                const decodedToken = jwtDecode(token);  

                if (!decodedToken || !decodedToken._id) {
                    console.error('Invalid token or missing _id:', decodedToken);
                    setMessage('Login failed. Please try again.');
                    return;
                }
                
                const { _id } = decodedToken;
                setUserId(_id);  // Update userId in context
                console.log('Setting userId to:', _id);
                setRedirect(true);
            } else {
                setMessage('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
            setMessage('Login failed. Please try again.');
        }
    };

    if (redirect) {
        return <Navigate to="/enviromentpreview" />;
    }

    return (
        <div>
            <div className="signup-container">
                <h2 style={{ color: "white", fontSize: "39px", textAlign: "left", fontWeight: "400" }}>Sign in</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label style={{ color: "#7F8AA1" }}>Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='your@email.com'
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ color: "#7F8AA1" }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='password'
                            required
                        />
                    </div>
                    <button type="submit">Sign In</button>
                </form>
                {message && <p style={{ color: "white", marginLeft: "100px", marginTop: "25px" }}>{message}</p>}
            </div>
        </div>
    );
}
