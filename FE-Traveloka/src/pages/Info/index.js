import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './info.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleUser, faTableList } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import { format } from 'date-fns';
const cx = classNames.bind(styles);

function Info() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [bookings, setBookings] = useState([]);

    const seatClassMapping = (seatClass) => {
        if (seatClass === 'phoThong') {
            return 'Phổ thông';
        } else if (seatClass === 'phoThongDacBiet') {
            return 'Phổ thông đặt biệt';
        } else if (seatClass === 'thuongGia') {
            return 'Thương gia';
        } else {
            return 'Hạng nhất';
        }
    };

    const formatDate = (isoString) => {
        return format(new Date(isoString), 'dd/MM/yyyy');
    };
    const formatTime = (isoString) => {
        return format(new Date(isoString), 'HH:mm');
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/booking/${user._id}`);
                setBookings(res.data.data.Bookings);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBookings();
    }, [user._id]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('left-content')}>
                    <div className={cx('container')}>
                        <div className={cx('header-left')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faCircleUser} />
                            <h1 className={cx('name-user')}>{user.fullname}</h1>
                        </div>
                        <div className={cx('content-left')}>
                            <div className={cx('my-booking')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faTableList} />
                                <p>Đặt chỗ của tôi</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('right-content')}>
                    <div className={cx('header-right')}>
                        <img className={cx('img')} src={images.easyreschedule} alt="easyreschedule" />
                        <div className={cx('content-header')}>
                            <h1>Traveloka Easy Reschedule</h1>
                            <h3>
                                Đổi lịch dễ như trở bàn tay.
                                <br />
                                <span>Tìm hiểu thêm</span>
                            </h3>
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <h1 className={cx('title')}>My Booking</h1>
                        <div className={cx('booking')}>
                            {bookings && bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <div key={booking._id} className={cx('user-booking')}>
                                        <div className={cx('header-user-booking')}>
                                            <img className={cx('icon-plane')} src={images.plane} alt="plane" />
                                            <div className={cx('info-booking')}>
                                                <p className={cx('airfield-from')}>
                                                    {booking.flight.airfield.from.nameAirfield} (
                                                    {booking.flight.airfield.from.codeAirfield})
                                                </p>
                                                <FontAwesomeIcon className={cx('icon-arrow')} icon={faArrowRight} />
                                                <p className={cx('airfield-to')}>
                                                    {booking.flight.airfield.to.nameAirfield} (
                                                    {booking.flight.airfield.to.codeAirfield})
                                                </p>
                                            </div>
                                        </div>
                                        <div className={cx('user-booking-content')}>
                                            <p className={cx('flight-code')}>
                                                <span className={cx('airlines')}>{booking.flight.airlines}</span> (
                                                {booking.flight.flightCode})
                                            </p>

                                            <p className={cx('time-departure')}>
                                                <span className={cx('date')}>{formatDate(booking.flight.date)}</span> (
                                                {formatTime(booking.flight.time.departure)})
                                            </p>
                                            <p className={cx('amount-tickets')}>
                                                Khách hàng
                                                {booking.infoCustomers.map((user) => (
                                                    <p key={user._id} className={cx('customer')}>
                                                        {user.fullName} - {user.seatNumber}
                                                    </p>
                                                ))}
                                            </p>
                                            <p className={cx('tickets')}>
                                                Hạng vé: {seatClassMapping(booking.seatClass)}
                                            </p>
                                            <p className={cx('price')}>Tổng tiền {booking.totalPrice} VNĐ</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className={cx('null-booking')}>
                                    <img alt="null-booking" src={images.zzz} />
                                    <div>
                                        <h1>Không tìm thấy đặt chỗ</h1>
                                        <p>
                                            Mọi chỗ bạn đặt sẽ được hiển thị tại đây. Hiện bạn chưa có bất kỳ đặt chỗ
                                            nào, hãy đặt trên trang chủ ngay!
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Info;
