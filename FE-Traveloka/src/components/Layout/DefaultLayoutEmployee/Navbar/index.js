import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD

const cx = classNames.bind(styles);

function Navbar() {
    const navigate = useNavigate();

=======
const cx = classNames.bind(styles);
function Navbar() {
    const navigate = useNavigate();
>>>>>>> 2a75d80 (Edit form Addflights)
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };
<<<<<<< HEAD

=======
>>>>>>> 2a75d80 (Edit form Addflights)
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav-bar')}>
                <div className={cx('content-employee')}>
                    <Button outline to="/listfilght" className={cx('btn-nav-bar')}>
                        Danh sách chuyến bay
                    </Button>
                    <Button outline to="/addflight" className={cx('btn-nav-bar')}>
                        Thêm chuyến bay
                    </Button>
                    <Button outline to="/viewcustomer" className={cx('btn-nav-bar')}>
                        Xem thông tin khách hàng
                    </Button>
                    <Button outline to="/statistics" className={cx('btn-nav-bar')}>
                        Thống kê doanh thu
                    </Button>
                    <Button outline to="/addairline" className={cx('btn-nav-bar')}>
                        Hãng hàng không
                    </Button>
                    <Button outline to="/addairfield" className={cx('btn-nav-bar')}>
                        Các sân bay
                    </Button>
                    <Button primary className={cx('btn-nav-bar')} onClick={handleLogout}>
                        Đăng xuất
                    </Button>
                </div>
            </div>
        </div>
    );
}
<<<<<<< HEAD

export default Navbar;
=======
export default Navbar;
>>>>>>> 2a75d80 (Edit form Addflights)
