import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginonly.css';

export function Login() {
    const navigate = useNavigate();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignup = () => {
        navigate('/signup'); 
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); 

        try {
            const res = await axios.get("https://ownfield-f0187-default-rtdb.firebaseio.com/user.json");
            const data = res.data;

            const user = Object.values(data).find(
                (u) => u.Username === username && u.Password === password
            );

            if (user) {
                navigate('/dishes');
            } else {
              
                setError("Invalid credentials");
            }
        } catch (error) {
            console.error('Login failed', error);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
           
        }
    };

    return (
        <main id="L-Main">
            <div id="Login">
                <h1 id="Login-Heading">Login</h1>
                <form id="form" onSubmit={handleLogin}>
                    <label className="label2" htmlFor="username">Username</label>
                    <input  className="enter20" type="text"  id="username" placeholder="Enter Your username"  value={username}   onChange={(e) => setUsername(e.target.value)} />

                    <label className="label2" htmlFor="password">Password</label>
                    <input className="enter20" type="password" id="password" placeholder="Enter Your password"  value={password}  onChange={(e) => setPassword(e.target.value)}  />
                    <button type="button" id="forgetbtn" onClick={() =>  navigate('/forget')}>
                        Forget Password?
                    </button>
                    
                    <button className="enter20" id="submit" type="submit" disabled={loading}> 
                        {loading ? "Logging in..." : "Login"}
                    </button>
                    
                    {error && <p className="error">{error}</p>} 
                    
                    <div className="create">
                        <label className="label2" htmlFor="sign">Don't have an account?</label>
                        <button id="sign" type="button" onClick={handleSignup}>Signup</button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Login;
