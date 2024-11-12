import styles from './ResetPass.module.scss';
import classNames from 'classnames/bind';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const cx = classNames.bind(styles);

function ResetPass() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleResetPass = async () => {
        if (!email || !newPassword || !confirmPassword) {
            setError('Không được để trống.');
            return;
        }
        
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu không trùng khớp.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/api/users/reset-password', {
                email,
                password: newPassword,
            });

            if (response.status === 200) {
                alert('Đặt lại mật khẩu thành công!');
                navigate('/login');
            } else {
                setError(response.data.message || 'Xảy ra lỗi khi đặt lại mật khẩu.');
            }
        } catch (error) {
            setError('Vui lòng thử lại.');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('reset')}>
                <h2>RESET PASSWORD</h2>
                <div className={cx('reset-inputs')}>
                    <div className={cx('reset-input')}>
                        <label>
                            <span>Email:</span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                //placeholder="Enter your email"
                            />
                        </label>
                    </div>
                    <div className={cx('reset-input')}>
                        <label>
                            <span>New Password:</span>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    <div className={cx('reset-input')}>
                        <label>
                            <span>Confirm:</span>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </label>
                    </div>
                    {error && <p className={cx('error')}>{error}</p>}
                    <button className={cx('reset-button')} onClick={handleResetPass}>
                        RESET
                    </button>
                    <div className={cx('back-to-login')} onClick={() => navigate('/login')}>
                        Back to login
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResetPass;