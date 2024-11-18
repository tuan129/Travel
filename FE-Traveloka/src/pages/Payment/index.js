import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Payment.module.scss';
import classNames from 'classnames/bind';
import { format } from 'date-fns';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const cx = classNames.bind(styles);

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();
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
    const seatMapping = location.state.seatClass;
    const { flight, returnFlight, adultCount, childCount, infantCount, totalCustomer, contactInfo, customerInfo } =
        location.state;
    console.log(customerInfo);

    const formatDate = (isoString) => {
        return format(new Date(isoString), 'dd/MM/yyyy');
    };

    const formatTime = (isoString) => {
        return format(new Date(isoString), 'HH:mm');
    };

    const user = localStorage.getItem('user');
    const users = JSON.parse(user);

    useEffect(() => {
        if (!user) {
            alert('Vui lòng đăng nhập');
            navigate('/login');
        }
    }, []);

    const flightPrice = flight.tickets[seatMapping].price;
    const returnTicketPrice = returnFlight?.tickets[seatMapping]?.price || 0;

    const totalAmount = (flightPrice + returnTicketPrice) * totalCustomer;

    const handleSuccessToast = () => {
        toast.success('Thanh toán thành công!', {
            onClose: () => {
                navigate('/home');
            },
        });
    };

    const handleErrorToast = () => {
        toast.error('Thanh toán thất bại. Vui lòng thử lại!');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('payment')}>
                    <h1>Đặt chổ của tôi</h1>
                    <ul className={cx('info-payment')}>
                        <li className={cx('airlines')}>Hãng hàng không: {flight.airlines}</li>
                        <li className={cx('code')}>
                            Sân bay cất cánh: {flight.airfield.from.nameAirfield}{' '}
                            {`(${flight.airfield.from.codeAirfield})`} - Sân bay hạ cánh:{' '}
                            {flight.airfield.to.nameAirfield} {`(${flight.airfield.to.codeAirfield})`}
                        </li>
                        <li className={cx('date')}>
                            Ngày đi: {formatDate(flight.date)}{' '}
                            {returnFlight ? `- Ngày về: ${formatDate(returnFlight.date)}` : ''}
                        </li>
                        <li className={cx('time')}>
                            Thời gian cất cánh: {formatTime(flight.time.departure)} - Thời gian hạ cánh:{' '}
                            {formatTime(flight.time.arrival)}
                        </li>
                        <li className={cx('price')}>Hạng ghế: {seatClassMapping(seatMapping)}</li>
                        <li className={cx('price')}>Giá vé: {flightPrice.toLocaleString()} VND</li>
                        <li className={cx('amount-cus')}>
                            Số lượng người:
                            <p>Số người lớn: {adultCount}</p>
                            <p>Số trẻ em: {childCount}</p>
                            <p>Số em bé: {infantCount}</p>
                        </li>
                        <p className={cx('total')}>Tổng giá tiền: {totalAmount.toLocaleString()} VND</p>
                    </ul>
                    <PayPalScriptProvider options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}>
                        <PayPalButtons
                            className={cx('paypal-btn')}
                            createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: totalAmount,
                                            },
                                        },
                                    ],
                                });
                            }}
                            onApprove={async (data, actions) => {
                                try {
                                    const res = await actions.order.capture();
                                    console.log('nay la responese', res);
                                    if (res.status === 'COMPLETED') {
                                        const newBookings = {
                                            user: users._id,
                                            flight: flight._id,
                                            status: 'checked-in',
                                            infoContact: contactInfo,
                                            infoCustomers: customerInfo,
                                            seatClass: seatMapping,
                                            totalPrice: flightPrice * totalCustomer,
                                        };
                                        console.log(newBookings);
                                        await axios.post('http://localhost:4000/api/booking', newBookings);
                                        if (returnFlight) {
                                            const newBookings = {
                                                user: users._id,
                                                flight: returnFlight._id,
                                                status: 'checked-in',
                                                infoContact: contactInfo,
                                                infoCustomers: customerInfo,
                                                seatClass: seatMapping,
                                                totalPrice: returnTicketPrice * totalCustomer,
                                            };
                                            console.log(newBookings);
                                            await axios.post('http://localhost:4000/api/booking', newBookings);
                                        }
                                        handleSuccessToast();
                                    }
                                    console.log(res);
                                } catch (err) {
                                    console.log('error', err.data);
                                    handleErrorToast();
                                }
                            }}
                            onError={(err) => {
                                console.error('Error during PayPal payment:', err);
                            }}
                        />
                    </PayPalScriptProvider>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Payment;
