import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../styles/UserRegister.css';
import { UserContext } from '../context/userContext';
import logo from '../public/logo-transparent-png.png';

export default function UserRegister() {
    const {fetchUser} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7000/login', {
                email,
                password,
            });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('UserToken', token);
                fetchUser(token);
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
        return <Navigate to="/selectTest" />;
    }

    return (
        <div>
            <div>
                <img style={{width:'120px', height:'120px'}} src={logo} alt='logo' />
            </div>
            <div style={{  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
        </div>
    );
}
