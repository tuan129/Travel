import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Payment.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Payment() {
    const location = useLocation();
    const { flight, adultCount = 1, childCount = 0, infantCount = 0 } = location.state || {};

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('payment')}>
                    <h1>Chi tiết giá</h1>
                    <ul className={cx('info-payment')}>
                        <li className={cx('airlines')}>- Hãng hàng không: {flight?.airline || ''}</li>
                        <li className={cx('code')}>
                            - Mã sân bay cất cánh: {flight?.departureCode || ''} - Mã sân bay hạ cánh:{' '}
                            {flight?.arrivalCode || ''}
                        </li>
                        <li className={cx('date')}>
                            - Ngày đi: {flight?.departureTime || ''} - Ngày về: {flight?.returnDate || ''}
                        </li>
                        <li className={cx('time')}>
                            - Thời gian cất cánh: {flight?.departureTime || ''} - Thời gian hạ cánh:{' '}
                            {flight?.arrivalTime || ''}
                        </li>
                        <li className={cx('price')}>
                            - Giá vé: {flight?.price ? flight.price.toLocaleString() : ''} VND
                        </li>
                        <li className={cx('amount-cus')}>
                            - Số lượng người:
                            <p>+ Số người lớn: {adultCount}</p>
                            <p>+ Số trẻ em: {childCount}</p>
                            <p>+ Số em bé: {infantCount}</p>
                        </li>
                        <p className={cx('total')}>
                            Tổng giá tiền:{' '}
                            {flight?.price
                                ? (flight.price * (adultCount + childCount + infantCount)).toLocaleString()
                                : ''}{' '}
                            VND
                        </p>
                    </ul>
                    <Button large >Thanh Toán</Button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
