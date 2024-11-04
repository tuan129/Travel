import classNames from 'classnames/bind';
import styles from './HeaderEmployee.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function HeaderEmployee() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Button to={'/listfilght'} className={cx('logo')}>
                    <img src={images.logo} alt="Traveloka" />
                </Button>
                <ul className={cx('nav')}>
                    <li>
                        <img className={cx('percent')} src={images.percent} alt="khuyen_mai" />
                        <a href="/">Khuyến Mãi</a>
                    </li>
                    {/* <li>
                        <a href="/">Hỗ Trợ</a>
                    </li> */}
                    {/* <li>
                        <a href="/">Hợp Tác Với Chúng Tôi</a>
                    </li> */}
                </ul>
            </div>
        </header>
    );
}

export default HeaderEmployee;