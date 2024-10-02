import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './InfoCustomer.module.scss';
import classNames from 'classnames/bind';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function InfoCustomer() {
    const location = useLocation();
    const navigate = useNavigate();
    const { flight, adultCount = 1, childCount = 0, infantCount = 0 } = location.state || {};

    const handleNextClick = () => {
        navigate('/payment', { state: { flight, adultCount, childCount, infantCount } });
    };

    const renderPassengerForms = () => {
        const forms = [];

        for (let i = 1; i <= adultCount; i++) {
            forms.push(
                <ul className={cx('info-family-member')} key={`adult-${i}`}>
                    <h2>Người lớn {i}</h2>
                    <div className={cx('thong-tin-nguoi-nhan')}>
                        <div className={cx('name')}>
                            <p>Họ và tên</p>
                            <input type="text" />
                            <p>như trên CMND (không dấu)</p>
                        </div>
                        <div className={cx('email')}>
                            <p>Quốc tịch</p>
                            <input type="text" />
                        </div>
                        <div className={cx('phone')}>
                            <p>Ngày sinh</p>
                            <input type="date" />
                        </div>
                    </div>
                </ul>,
            );
        }

        for (let i = 1; i <= childCount; i++) {
            forms.push(
                <ul className={cx('info-family-member')} key={`child-${i}`}>
                    <h2>Trẻ em {i}</h2>
                    <div className={cx('thong-tin-nguoi-nhan')}>
                        <div className={cx('name')}>
                            <p>Họ và tên</p>
                            <input type="text" />
                            <p>như trên CMND (không dấu)</p>
                        </div>
                        <div className={cx('email')}>
                            <p>Quốc tịch</p>
                            <input type="text" />
                        </div>
                        <div className={cx('phone')}>
                            <p>Ngày sinh</p>
                            <input type="date" />
                        </div>
                    </div>
                </ul>,
            );
        }

        for (let i = 1; i <= infantCount; i++) {
            forms.push(
                <ul className={cx('info-family-member')} key={`infant-${i}`}>
                    <h2>Em bé {i}</h2>
                    <div className={cx('thong-tin-nguoi-nhan')}>
                        <div className={cx('name')}>
                            <p>Họ và tên</p>
                            <input type="text" />
                            <p>như trên CMND (không dấu)</p>
                        </div>
                        <div className={cx('email')}>
                            <p>Quốc tịch</p>
                            <input type="text" />
                        </div>
                        <div className={cx('phone')}>
                            <p>Ngày sinh</p>
                            <input type="date" />
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
                                    <input type="text" />
                                    <p>như trên CMND (không dấu)</p>
                                </div>
                                <div className={cx('phone')}>
                                    <p>Số điện thoại</p>
                                    <input type="text" />
                                </div>
                                <div className={cx('email')}>
                                    <p>Email</p>
                                    <input type="email" />
                                    <p>VD: email@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('info-customer')}>
                        <h1>Thông tin hành khách</h1>
                        {renderPassengerForms()}
                    </div>
                    <Button primary className={cx('next')} onClick={handleNextClick}>
                        Tiếp tục
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default InfoCustomer;
