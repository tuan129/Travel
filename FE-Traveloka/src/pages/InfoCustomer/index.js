import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './InfoCustomer.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function InfoCustomer() {
    const location = useLocation();
    const navigate = useNavigate();
    const { flight, returnFlight, adultCount, childCount, infantCount, totalCustomer, seat } = location.state;

    const [error, setError] = useState('');
    const displayError = (message) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, 3000);
    };

    // Quản lý trạng thái thông tin liên hệ
    const [contactInfo, setContactInfo] = useState({
        fullName: '',
        phone: '',
        email: '',
    });

    // Quản lý trạng thái thông tin khách hàng
    const [customerInfo, setCustomerInfo] = useState(
        Array.from({ length: totalCustomer }, () => ({
            fullName: '',
            nationality: '',
            birthDay: '',
            customerType: '',
            seatNumber: '',
        })),
    );

    // Lưu trữ trạng thái thông tin liên hệ
    const handleContactChange = (e) => {
        const { name, value } = e.target;
        setContactInfo((prev) => ({ ...prev, [name]: value }));
    };

    // Lưu trữ trạng thái thông tin hành khách
    const handlePassengerChange = (index, e) => {
        const { name, value } = e.target;
        setCustomerInfo((prev) => {
            const newCustomer = [...prev];
            newCustomer[index][name] = value;
            return newCustomer;
        });
    };

    const handleNextClick = () => {
        if (!contactInfo.fullName || !contactInfo.phone || !contactInfo.email) {
            displayError('Vui lòng điền đầy đủ thông tin liên hệ.');
            return;
        }

        if (customerInfo.some((info) => !info.fullName || !info.nationality || !info.birthDay)) {
            displayError('Vui lòng điền đầy đủ thông tin hành khách.');
            return;
        }

        navigate('/payment', {
            state: {
                flight,
                returnFlight: returnFlight ? returnFlight : null,
                adultCount,
                childCount,
                infantCount,
                contactInfo,
                customerInfo,
                totalCustomer,
                seatClass: seat,
            },
        });
    };

    const renderPassengerForms = (count, type, startIndex) => {
        const forms = [];
        for (let i = 0; i < count; i++) {
            forms.push(
                <ul className={cx('info-family-member')} key={`${type}-${i}`}>
                    <h2>
                        {type} {i + 1}
                    </h2>
                    <div className={cx('thong-tin-nguoi-nhan')}>
                        <div className={cx('name')}>
                            <p>Họ và tên</p>
                            <input
                                type="text"
                                name="fullName"
                                value={customerInfo[startIndex + i]?.fullName}
                                onChange={(e) => handlePassengerChange(startIndex + i, e)}
                            />
                            <p>như trên CCCD (không dấu)</p>
                        </div>
                        <div className={cx('email')}>
                            <p>Quốc tịch</p>
                            <input
                                type="text"
                                name="nationality"
                                value={customerInfo[startIndex + i]?.nationality}
                                onChange={(e) => handlePassengerChange(startIndex + i, e)}
                            />
                        </div>
                        <div className={cx('phone')}>
                            <p>Ngày sinh</p>
                            <input
                                type="date"
                                name="birthDay"
                                value={customerInfo[startIndex + i]?.birthDay}
                                onChange={(e) => handlePassengerChange(startIndex + i, e)}
                            />
                        </div>
                    </div>
                </ul>,
            );
        }
        return forms;
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('info')}>
                    <div className={cx('info-contact')}>
                        <h1>Thông tin liên hệ</h1>
                        <div className={cx('info-family-member')}>
                            <h2>Thông tin liên hệ (nhận vé/phiếu thanh toán)</h2>
                            <div className={cx('thong-tin-nguoi-nhan')}>
                                <div className={cx('name')}>
                                    <p>Họ và tên</p>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={contactInfo.fullName}
                                        onChange={handleContactChange}
                                    />
                                    <p>như trên CCCD (không dấu)</p>
                                </div>
                                <div className={cx('phone')}>
                                    <p>Số điện thoại</p>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={contactInfo.phone}
                                        onChange={handleContactChange}
                                    />
                                </div>
                                <div className={cx('email')}>
                                    <p>Email</p>
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactInfo.email}
                                        onChange={handleContactChange}
                                    />
                                    <p>VD: email@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={cx('info-customer')}>
                        <h1>Thông tin hành khách</h1>
                        {renderPassengerForms(adultCount, 'Người lớn', 0)}
                        {renderPassengerForms(childCount, 'Trẻ em', adultCount)}
                        {renderPassengerForms(infantCount, 'Em bé', adultCount + childCount)}
                    </div>

                    {error && <span className={cx('error')}>{error}</span>}
                    <Button primary className={cx('next')} onClick={handleNextClick}>
                        TIẾP TỤC
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default InfoCustomer;
