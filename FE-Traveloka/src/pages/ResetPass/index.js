import styles from './ResetPass.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function ResetPass() {
    return (
        <div>
            <div>
                <h1 className={cx('title')}>Reset Password</h1>
                <p className={cx('description')}>Enter your new password and confirm it.</p>
                <div>
                    <input type="password" placeholder="New Password" />
                    <input type="password" placeholder="Confirm Password" />
                </div>
                <button className={cx('button')}>Reset Password</button>
            </div>
        </div>
    );
}

export default ResetPass;
