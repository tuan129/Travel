import Context from './Context';
import { useState } from 'react';

function Provider({ children }) {
    const [flights, setFlights] = useState([]);

    const addFlight = (flight) => {
        setFlights((prevFlights) => [...prevFlights, flight]);
    };

    return <Context.Provider value={{ flights, addFlight }}>{children}</Context.Provider>;
}

export default Provider;
