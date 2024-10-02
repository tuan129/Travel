import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('footer')}>
                <div className={cx('left-footer')}>
                    <div>
                        <img src={images.logoFotter} alt="Traveloka" />
                    </div>
                    <div className={cx('doi-tac')}>
                        <img src={images.iATA} alt="Traveloka" />
                        <img src={images.bsi} alt="Traveloka" />
                        <img src={images.dadangky} alt="Traveloka" />
                        <div className={cx('colap')}>
                            <img src={images.colap} alt="Traveloka" />
                            <p>Hợp tác với Traveloka</p>
                        </div>
                    </div>

                    <div className={cx('partner')}>
                        <div className={cx('title-partner')}>Đối Tác Thanh Toán</div>

                        <div className={cx('image-footer')}>
                            <div className={cx('img-partner')}>
                                <img src={images.masterCard} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.visa} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.jcb} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.onePay} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.payOo} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.vietComBank} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.ciTiMa} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.bsMart} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.choLon} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.circleK} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.longHun} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.coCoMart} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.d} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.coMai} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.familyMart} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.hNam} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.hongY} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.nedoMark} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.miniStop} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.phucAnh} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.vinMark} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.american} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.momo} alt="Traveloka" />
                            </div>
                            <div className={cx('img-partner')}>
                                <img src={images.alePay} alt="Traveloka" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('right-footer')}>
                    <div className={cx('right')}>
                        <div className={cx('about')}>
                            <p>Về Traveloka</p>
                            <ul>
                                <li>Cách đặt chổ</li>
                                <li>Liên hệ chúng tôi</li>
                                <li>Trợ giúp</li>
                                <li>Tuyển dụng</li>
                                <li>Về chúng tôi</li>
                                <li>Tính năng mới ra mắt</li>
                            </ul>
                        </div>
                        <div className={cx('follow')}>
                            <p>Theo dõi chúng tôi trên</p>
                            <ul>
                                <li>
                                    <a href="/">
                                        <img src={images.fb} alt="facebook" />
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <img src={images.insta} alt="Instagram" />
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <img src={images.tiktok} alt="Tiktok" />
                                        Tiktok
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <img src={images.ytb} alt="YouTube" />
                                        YouTube
                                    </a>
                                </li>
                                <li>
                                    <a href="/">
                                        <img src={images.tele} alt="Telegram" />
                                        Telegram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* San Pham */}
                    <div className={cx('right')}>
                        <div className={cx('about')}>
                            <p>Sản phẩm</p>
                            <ul>
                                <li>Khách sạn</li>
                                <li>Vé máy bay</li>
                                <li>Vé xe khách</li>
                                <li>Đưa đón sân bay</li>
                                <li>Cho thuê xe</li>
                                <li>Hoạt động và vui chơi</li>
                                <li>Du thuyền</li>
                                <li>Biệt thự</li>
                                <li>Căn hộ</li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('right')}>
                        <div className={cx('about')}>
                            <p>Khác</p>
                            <ul>
                                <li>Traveloka Affiliate</li>
                                <li>Traveloka Blog</li>
                                <li>Chính Sách Quyền Riêng</li>
                                <li>Điều khoản & điều kiện</li>
                                <li>Quy chế hoạt động</li>
                                <li>Đăng ký nơi nghỉ của bạn</li>
                                <li>
                                    Đăng ký doanh nghiệp hoạt động du<br></br> lịch của bạn
                                </li>
                                <li>Khu vực báo chí</li>
                                <li>Vulnerability Disclosure Program</li>
                            </ul>
                        </div>
                        <div className={cx('download')}>
                            <p>DownLoad App</p>
                            <div className={cx('app-downl')}>
                                <img src={images.ggPlay} alt="Android" />
                                <img src={images.appleStore} alt="Apple" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('footer-nav')}>
                <p>
                    Công ty TNHH Traveloka Việt Nam. Mã số DN: 0313581779. Tòa nhà An Phú, 117-119 Lý Chính Thắng, P. 7,
                    Q. 3, TPHCM
                </p>
                <p>Copyright © 2024 Traveloka. All rights reserved</p>
            </div>
        </footer>
    );
}

export default Footer;
