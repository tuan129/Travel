import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import classNames from 'classnames/bind';
import Button from '~/components/Button';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            setError('Email và Mật Khẩu không được để trống.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/api/users/login', {
                email,
                password,
            });

            const data = await response.data;
            if (response.status === 200) {
                const { role, token, user } = data;
                // Lưu token vào localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                // Chuyển hướng người dùng dựa trên vai trò của họ
                if (role === 'admin') {
                    navigate('/listfilght');
                    window.location.reload();
                } else if (role === 'user') {
                    navigate('/');
                    window.location.reload();
                }
            } else {
                setError(data.message || 'Đăng nhập thất bại.');
            }
        } catch (error) {
            setError('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('login')}>
                <h2>ĐĂNG NHẬP</h2>
                <div className={cx('input')}>
                    <div className={cx('input-form')}>
                        <label>
                            <span>Email: </span>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </label>
                    </div>
                    <div className={cx('input-form')}>
                        <label>
                            <span>Mật khẩu: </span>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </label>
                    </div>
                    {error && <p className={cx('error')}>{error}</p>}
                    <Button primary onClick={handleLogin}>
                        ĐĂNG NHẬP
                    </Button>
                </div>
                <div className={cx('login-orthers')}>
                    <p>
                        Chưa có tài khoản?
                        <Button className={cx('btn-register')} text to="/register">
                            Đăng ký
                        </Button>
                    </p>
                    <p>
                        Quên mật khẩu?
                        <Button text to="/forgetpass">
                            Đổi mật khẩu
                        </Button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;