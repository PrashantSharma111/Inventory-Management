import React from 'react';
import './Navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg sticky-top">
            <div className="container-fluid">
                <Link className="hindi link" to="/">रवि ट्रेडर्स</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`link ${location.pathname === '/' ? 'highlight' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className={`link ${location.pathname === '/x' ? 'highlight' : ''}`} aria-current="page" to="/">Coming Soon</Link>
                        </li> */}
                    </ul>
                </div>
                {
                    !localStorage.getItem('token') ? 
                    <div className='d-flex'>
                        <Link className="button mx-2" to="/login">Login</Link>
                        <Link className="button mx-2" to="/signup">Sign Up</Link>
                    </div>
                    :
                    <div className='d-flex'>
                        <button className="button mx-2" onClick={ handleLogout }>Logout</button>
                    </div>
                }
            </div>
        </nav>
    )
}

export default Navbar
