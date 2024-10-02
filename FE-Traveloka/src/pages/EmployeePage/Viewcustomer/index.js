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
    const { setFlights, setCustomers } = useContext(Context);
    const [flights, setLocalFlights] = useState([]);
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
                    {flights.map((flight) => (
                        <div key={flight.flightNumber} className={cx('customer-of-airline')}>
                            <h1 className={cx('flight-number')}>Mã chuyến bay: {flight.flightNumber}</h1>
                            <ul className={cx('list-customer-item')}>
                                {customers
                                    .filter((customer) => customer.flightNumber === flight.flightNumber)
                                    .map((customer) => (
                                        <li key={customer.id} className={cx('customer-item')}>
                                            <div className={cx('customer-info')}>
                                                <p className={cx('name')}>Tên Khách hàng: {customer.name}</p>
                                                <p className={cx('email')}>Email: {customer.email}</p>
                                                <p className={cx('code-ticket')}>Mã vé: {customer.ticketCode}</p>
                                                <p className={cx('reason')}>Lý do hủy vé: {customer.cancelReason}</p>
                                            </div>
                                            <Button className={cx('btn-delete')} primary>
                                                Hủy vé
                                            </Button>
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
