import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Payment.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

function Payment() {
    const location = useLocation();
    const { flights, adultCount, childCount, infantCount, totalCustomer, seatMapping } = location.state;

    const formatDate = (isoString) => {
        return format(new Date(isoString), 'dd/MM');
    };

    const formatTime = (isoString) => {
        return format(new Date(isoString), 'HH:mm');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('payment')}>
                    <h1>Đặt chổ của tôi</h1>
                    <ul className={cx('info-payment')}>
                        <li className={cx('airlines')}>Hãng hàng không: {flights.airlines}</li>
                        <li className={cx('code')}>
                            Sân bay cất cánh: {flights.airfield.from.nameAirfield}{' '}
                            {`(${flights.airfield.from.codeAirfield})`} - Sân bay hạ cánh:{' '}
                            {flights.airfield.to.nameAirfield} {`(${flights.airfield.to.codeAirfield})`}
                        </li>
                        <li className={cx('date')}>
                            Ngày đi: {formatDate(flights.date)} - Ngày về: {flights.returnDate}
                        </li>
                        <li className={cx('time')}>
                            Thời gian cất cánh: {formatTime(flights.time.departure)} - Thời gian hạ cánh:{' '}
                            {formatTime(flights.time.arrival)}
                        </li>
                        <li className={cx('price')}>
                            Hạng ghế: {flights?.price ? flights.price.toLocaleString() : ''}
                        </li>
                        <li className={cx('price')}>
                            Giá vé: {flights.tickets[seatMapping].price.toLocaleString()} VND
                        </li>
                        <li className={cx('amount-cus')}>
                            Số lượng người:
                            <p>Số người lớn: {adultCount}</p>
                            <p>Số trẻ em: {childCount}</p>
                            <p>Số em bé: {infantCount}</p>
                        </li>
                        <p className={cx('total')}>
                            Tổng giá tiền: {(flights.tickets[seatMapping].price * totalCustomer).toLocaleString()} VND
                        </p>
                    </ul>
                    <Button large>Thanh Toán</Button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
