import React, { useContext } from 'react';
import './Alert.css';
import AlertContext from '../Context/AlertContext';

const Alert = () => {

    const { alert } = useContext(AlertContext);

    return (
        <div className="alert-container">
            { alert && <div className={`alert alert-${ alert.type }`} role="alert">
                {alert.message}
            </div>}
        </div>
    )
}

export default Alert
