import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Register.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function Register() {
    const navigate = useNavigate();
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const displayError = (message) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, 3000);
    };

    const handleRegister = async () => {
        if (!fullname || !email || !password || !rePassword) {
            displayError('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        if (password !== rePassword) {
            displayError('Mật khẩu không khớp.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/users/register', {
                fullname,
                email,
                password,
            });

            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            displayError('Đăng ký không thành công.');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('register')}>
                <h2>ĐĂNG KÝ</h2>
                <div className={cx('input')}>
                    <div className={cx('account')}>
                        <div className={cx('input-form')}>
                            <label>
                                <span>Họ & Tên: </span>
                                <input
                                    className={cx('name-account')}
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    placeholder= "Full name"
                                />
                            </label>
                        </div>
                        <div className={cx('input-form')}>
                            <label>
                                <span>Email: </span>
                                <input
                                    className={cx('name-login')}
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder= "Email"
                                />
                            </label>
                        </div>
                    </div>
                    <div className={cx('pass')}>
                        <div className={cx('input-form')}>
                            <label>
                                <span>Mật khẩu: </span>
                                <input
                                    className={cx('password')}
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder= "Password"
                                />
                            </label>
                        </div>
                        <div className={cx('input-form')}>
                            <label>
                                <span>Nhập lại mật khẩu: </span>
                                <input
                                    className={cx('re-pass')}
                                    type="password"
                                    value={rePassword}
                                    onChange={(e) => setRePassword(e.target.value)}
                                    placeholder= "Re-Password"
                                />
                            </label>
                        </div>
                    </div>
                </div>
                {error && <p className={cx('error')}>{error}</p>}
                <Button primary onClick={handleRegister}>
                    ĐĂNG KÝ
                </Button>

                <div className={cx('login-orther')}>
                    {/* <span>
                        Đã có tài khoản?{' '}
                        <Button text to="/login">
                            ĐĂNG NHẬP
                        </Button>
                    </span> */}
                    <span>
                        <Button text to="/login">
                            ĐĂNG NHẬP
                        </Button>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;