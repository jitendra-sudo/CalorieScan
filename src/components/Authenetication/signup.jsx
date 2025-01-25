import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signuponly.css';
import axios from 'axios'; 

function Signup() {
    const navigate = useNavigate();

  
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userData = { Name: name, Username: username, Email: email, Phone: phone, Password: password };

            const response = await axios.post("https://ownfield-f0187-default-rtdb.firebaseio.com/user.json", userData); 
           
            // localStorage.setItem("username" , username)
             navigate('/dishes')
            setName('');
            setUsername('');
            setEmail('');
            setPhone('');
            setPassword('');
            console.log(response.data)
        } catch (error) {
            setError("Some problem in data send");
            alert("Some problem in data send");
        } finally {
            setLoading(false);
          
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <>
        <main id='H-Sign'>
        <div id="signup">
            <h1 className='Signup-Heading'>Sign Up</h1>
            <form id='form' onSubmit={handleSubmit}> 
                <label className='label1' htmlFor="name">Name</label>
                <input type="text" className='enter' id="name"  name="name"  placeholder="Enter your name"  value={name}    onChange={(e) => setName(e.target.value)} required  />

                <label className='label1' htmlFor="username">Username</label>
                <input type="text" className='enter' id="username"  name="username"  placeholder="Enter your username"  value={username}  onChange={(e) => setUsername(e.target.value)} required/>

                <label className='label1' htmlFor="email">Email</label>
                <input  type="email" className='enter' id="email"  name="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                <label className='label1' htmlFor="phone">Phone number</label>
                <input type="text" className='enter'  id="phone"  name="phone"  placeholder="Enter your phone" value={phone}  onChange={(e) => setPhone(e.target.value)} maxLength={10} required />

                <label className='label1' htmlFor="password">Password</label>
                <input type="password" className='enter' id="password"  name="password"  placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit" id="create" disabled={loading}>   {loading ? 'Creating Account...' : 'Create Account'} </button>

                <div className="loginpage">
                    <label htmlFor="login">Already have an account?</label>
                    <button onClick={handleLogin} id="login"> Login </button>
                </div>
            </form>
        </div>
        </main></>
    );
}

export default Signup;
