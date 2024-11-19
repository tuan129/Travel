import { useEffect, useState } from 'react';
// Styles
import styles from './Viewcustomer.module.scss';
// Library
import classNames from 'classnames/bind';
import axios from 'axios';
import images from '~/assets/images';
const cx = classNames.bind(styles);

function Viewcustomer() {
    const [flights, setFlights] = useState([]);
    const formatType = (type) => {
        if (type === 'Adult') {
            return 'Người lớn';
        } else if (type === 'Child') {
            return 'Trẻ em';
        } else return 'Em bé';
    };

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
                    {flights && flights.length > 0 ? (
                        flights.map((flightData) => (
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
                                                    <td>{formatType(customer.customerType)}</td>
                                                </tr>
                                            )),
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        ))
                    ) : (
                        <div className={cx('null-booking')}>
                            <img alt="null-booking" src={images.zzz} />
                            <div>
                                <h1>Chưa có khách hàng đặt chỗ!!!</h1>
                                <p>
                                    Mọi khách hàng đã đặt sẽ được hiển thị tại đây. Hiện bạn chưa có bất kỳ đặt chỗ nào,
                                    hãy đặt trên trang chủ ngay!
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Viewcustomer;
