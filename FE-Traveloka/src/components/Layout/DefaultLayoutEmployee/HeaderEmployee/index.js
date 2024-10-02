import classNames from 'classnames/bind';
import styles from './HeaderEmployee.module.scss';
import Button from '~/components/Button';
import images from '~/assets/images';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function HeaderEmployee() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xóa token từ localStorage hoặc sessionStorage
        localStorage.removeItem('token');

        // Chuyển hướng về trang đăng nhập
        navigate('/');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav-bar')}>
                <div className={cx('content-employee')}>
                    <div className={cx('logo')}>
                        <Button to={'/listfilght'} className={cx('btn-nav-bar')}>
                            <img src={images.logo} alt="Traveloka" />
                        </Button>
                    </div>
                    <Button outline to="/addflight" className={cx('btn-nav-bar')}>
                        Thêm chuyến bay
                    </Button>
                    <Button outline to="/viewcustomer" className={cx('btn-nav-bar')}>
                        Xem thông tin khách hàng
                    </Button>
                    <Button outline to="/statistics" className={cx('btn-nav-bar')}>
                        Thống kê doanh thu
                    </Button>
                    <Button primary className={cx('btn-nav-bar')} onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default HeaderEmployee;
