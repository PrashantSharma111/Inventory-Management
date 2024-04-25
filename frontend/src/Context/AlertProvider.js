import { useState } from "react";
import AlertContext from "./AlertContext";

const AlertProvider = (props) => {

    const [ alert, setAlert ] = useState(null);

    const alertSetter = (x) => {
        setAlert(x);
        setTimeout(() => {
            setAlert(null);
        }, 1000);
    }

    return (
        <AlertContext.Provider value={{ alert, alertSetter }} >
            { props.children }
        </AlertContext.Provider>
    )
}

export default AlertProvider;
