import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './info.module.scss';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faCircleUser, faTableList } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
const cx = classNames.bind(styles);
function Info() {
    const user = JSON.parse(localStorage.getItem('user'));
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                // const response = await axios.get('API_ENDPOINT_HERE');
                // setBookings(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchBookings();
    }, []);
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
                                <p>đặt chổ của tôi</p>
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
                                                <p className={cx('airfield-from')}>{booking.airfield.from}</p>
                                                <FontAwesomeIcon className={cx('icon-arrow')} icon={faArrowRight} />
                                                <p className={cx('airfield-to')}>{booking.airfield.to}</p>
                                            </div>
                                        </div>
                                        <div className={cx('user-booking-content')}>
                                            <p className={cx('flight-code')}>
                                                {booking.flightCode} -{' '}
                                                <span className={cx('airlines')}>{booking.airlines}</span>
                                            </p>

                                            <p className={cx('time-departure')}>
                                                {booking.departure.time} -{' '}
                                                <span className={cx('date')}>{booking.date}</span>
                                            </p>
                                            <p className={cx('amount-tickets')}>
                                                - Số lượng vé: {booking.totalTickets}
                                            </p>
                                            <p className={cx('tickets')}>
                                                - Hạng vé: {booking.class} -{' '}
                                                <span className={cx('price')}>{booking.ticketPrice}</span>
                                            </p>
                                            <p className={cx('count-chair')}>- Ghế ngồi: {booking.seatNumber}</p>
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
