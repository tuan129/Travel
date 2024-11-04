//Hook
import { useEffect, useState } from 'react';
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
        const getBooking = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/booking/');
                const groupedFlights = res.data.data.booking.reduce((acc, booking) => {
                    const flightId = booking.flight._id;
                    if (!acc[flightId]) {
                        acc[flightId] = {
                            flight: booking.flight,
                            customers: [],
                        };
                    }
                    acc[flightId].customers.push(booking);
                    return acc;
                }, {});

                setFlights(Object.values(groupedFlights));
            } catch (err) {
                console.error('Error fetching flights:', err);
            }
        };
        getBooking();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>Danh sách Khách hàng</h1>
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
