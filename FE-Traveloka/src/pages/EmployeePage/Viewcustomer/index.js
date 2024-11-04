//Hook
import { useEffect, useState, useContext } from 'react';

//Component
import Button from '~/components/Button';
import Context from '~/components/useContext/Context';

// Styles
import styles from './Viewcustomer.module.scss';
// Library
import classNames from 'classnames/bind';
import axios from 'axios';
const cx = classNames.bind(styles);

function Viewcustomer() {
    const [flights, setFlights] = useState([]);
    const [customers, setLocalCustomers] = useState([]);

    useEffect(() => {
        // Fetch flights
        axios
            .post('http://localhost:3001/api/flights')
            .then((response) => {
                setLocalFlights(response.data);
                setFlights(response.data);
            })
            .catch((error) => {
                console.error('Error fetching flights:', error);
            });

        // Fetch customers
        axios
            .post('http://localhost:3001/api/customers')
            .then((response) => {
                setLocalCustomers(response.data);
                setCustomers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching customers:', error);
            });
    }, [setFlights, setCustomers]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>Danh sách Khách hàng:</h1>
                <div className={cx('list-customer')}>
                    {flights.map((flightData) => (
                        <div key={flightData.flight._id} className={cx('customer-of-airline')}>
                            <h1 className={cx('flight-number')}>Mã chuyến bay: {flightData.flight.flightCode}</h1>
                            <ul className={cx('list-customer-item')}>
                                {flightData.customers.map((booking) => (
                                    <li key={booking._id} className={cx('customer-item')}>
                                        <div className={cx('customer-info')}>
                                            <p className={cx('name')}>Tên Khách hàng: {booking.infoContact.fullName}</p>
                                            <p className={cx('email')}>Email: {booking.infoContact.email}</p>
                                            <p className={cx('code-ticket')}>Mã vé: {booking.flight._id}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Viewcustomer;
