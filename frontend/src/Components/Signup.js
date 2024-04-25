import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import AlertContext from '../Context/AlertContext';

const Signup = () => {

    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const { alertSetter } = useContext(AlertContext);

	const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try 
        {
            const response = await fetch(`${host}/api/auth/adduser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            const json = await response.json();

            if (json.success) {
                alertSetter({ message: json.message, type: "warning"});
                localStorage.setItem('token', json.token);
                localStorage.setItem('admin', 'false');
                navigate('/');
            }
            else {
                alertSetter({ message: json.message, type: "danger"});
            }
        }
        catch (error) {
            alertSetter({ message: error, type: "danger"});
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='signupContainer blur my-3 background'>
            <form onSubmit={handleSubmit}>
                <h2 className='text-center'>Sign Up</h2>
                <div>
                    <input type="text" id="name" name='name' onChange={onChange} required placeholder='Name' />
                    <input type="email" id="email" name='email' onChange={onChange} required placeholder='Email' />
                    <input type="password" id="password" name='password' onChange={onChange} autoComplete='on' required placeholder='Password' minLength={8} />
                </div>
                <button type="submit" disabled={ credentials.name.trim() === "" || credentials.email.trim() === "" || credentials.password.trim() === "" }>Sign Up</button>
            </form>
            <Link to="/login">Already have an account? Login</Link>
        </div>
    )
}

export default Signup
