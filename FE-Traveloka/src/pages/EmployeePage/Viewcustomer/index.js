import { useEffect, useState } from 'react';
// Styles
import styles from './Viewcustomer.module.scss';
// Library
import classNames from 'classnames/bind';
import axios from 'axios';
const cx = classNames.bind(styles);

function Viewcustomer() {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const getBooking = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/booking');
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
                console.error('Lỗi khi lấy dữ liệu chuyến bay:', err);
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
                            <h1 className={cx('flight-number')}>Mã chuyến bay {flightData.flight.flightCode}</h1>
                            <table className={cx('customer-table')}>
                                <thead>
                                    <tr className={cx('table-heading')}>
                                        <th colSpan={3}>Thông tin liên hệ</th>
                                        <th colSpan={4}>Thông tin khách hàng</th>
                                    </tr>
                                    <tr>
                                        <th>Tên</th>
                                        <th>SĐT</th>
                                        <th>Email</th>
                                        <th>Tên khách hàng</th>
                                        <th>Số ghế</th>
                                        <th>Quốc tịch</th>
                                        <th>Loại</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {console.log(flightData.customers)}
                                    {flightData.customers.map((booking) =>
                                        booking.infoCustomers.map((customer, index) => (
                                            <tr key={index}>
                                                {index === 0 && (
                                                    <td rowSpan={booking.infoCustomers.length}>
                                                        {booking.infoContact.fullName}
                                                    </td>
                                                )}
                                                {index === 0 && (
                                                    <td rowSpan={booking.infoCustomers.length}>
                                                        {booking.infoContact.phone}
                                                    </td>
                                                )}
                                                {index === 0 && (
                                                    <td rowSpan={booking.infoCustomers.length}>
                                                        {booking.infoContact.email}
                                                    </td>
                                                )}
                                                <td>{customer.fullName}</td>
                                                <td>{customer.seatNumber}</td>
                                                <td>{customer.nationality}</td>
                                                <td>{customer.customerType}</td>
                                            </tr>
                                        )),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Viewcustomer;
