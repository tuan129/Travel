import styles from './DefaultLayoutEmployee.module.scss';
import classNames from 'classnames/bind';
import HeaderEmployee from './HeaderEmployee';

const cx = classNames.bind(styles);

function DefaultLayoutEmployee({ children }) {
    return (
        <div className={cx('wrapper')}>
            <HeaderEmployee />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayoutEmployee;
