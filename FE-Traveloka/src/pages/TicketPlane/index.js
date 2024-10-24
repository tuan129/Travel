// Hook
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// library
import classNames from 'classnames/bind';
import styles from './TicketPlane.module.scss';
import { format } from 'date-fns';

// component
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const formatDateTime = (isoString) => {
    return format(new Date(isoString), 'HH:mm (dd/MM)');
};

function TicketPlane() {
    const location = useLocation();
    const navigate = useNavigate();
    const flights = location.state?.flights;
    const seatClass = location.state?.seatClass;

    const seatClassMapping = (seatClass) => {
        if (seatClass === 'Phổ thông') {
            return 'phoThong';
        } else if (seatClass === 'Phổ thông đặt biệt') {
            return 'phoThongDacBiet';
        } else if (seatClass === 'Thương gia') {
            return 'thuongGia';
        } else {
            return 'hangNhat';
        }
    };

    const seatMapping = seatClassMapping(seatClass);

    const [selectedFlight, setSelectedFlight] = useState(null);

    const handleDetailClick = (flights) => {
        if (selectedFlight && selectedFlight.flightNumber === flights.flightNumber) {
            // Nếu chuyến bay hiện tại đang được chọn thì bỏ chọn (ẩn chi tiết)
            setSelectedFlight(null);
        } else {
            // Nếu chuyến bay khác được chọn thì hiển thị chi tiết của chuyến bay đó
            setSelectedFlight(flights);
        }
    };

    const handleSelectClick = (flights) => {
        // Điều hướng đến trang InfoCustomer và truyền thông tin chuyến bay cùng số lượng hành khách
        navigate('/infocustomer', {
            state: {
                flights,
                adultCount: location.state?.adultCount,
                childCount: location.state?.childCount,
                infantCount: location.state?.infantCount,
                totalCustomer: location.state?.totalCustomer,
                seatMapping,
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <ul className={cx('list-tickets')}>
                    <h1>Danh sách các chuyến bay</h1>
                    {flights.map((flights, index) => (
                        <li key={index} className={cx('ticket-item')}>
                            <div className={cx('info-ticket')}>
                                <p>{flights.airlines}</p>
                                <p className={cx('place')}>
                                    {flights.airfield.from.city} - {flights.airfield.to.city}
                                    <br />
                                    <span className={cx('time')}>
                                        {formatDateTime(flights.time.departure)} -{' '}
                                        {formatDateTime(flights.time.arrival)}
                                    </span>
                                </p>
                                <p className={cx('money')}>
                                    Giá vé:
                                    {flights.tickets[seatMapping]?.price
                                        ? flights.tickets[seatMapping].price.toLocaleString()
                                        : ''}{' '}
                                    VND
                                </p>
                            </div>
                            <div className={cx('btn-handle')}>
                                <Button className={cx('details')} onClick={() => handleDetailClick(flights)}>
                                    Chi tiết
                                </Button>
                                <Button primary onClick={() => handleSelectClick(flights)}>
                                    Chọn
                                </Button>
                            </div>
                            {selectedFlight && selectedFlight.flightCode === flights.flightCode && (
                                <div className={cx('flight-details')}>
                                    <h2>Chi tiết chuyến bay</h2>
                                    <p>Hãng hàng không: {selectedFlight.airlines}</p>
                                    <p>Mã chuyến bay: {selectedFlight.flightCode}</p>
                                    <p>
                                        Thành phố cất cánh: {selectedFlight.airfield.from.city}{' '}
                                        {selectedFlight.departureCode}
                                    </p>
                                    <p>
                                        Thành phố hạ cánh: {selectedFlight.airfield.to.city}{' '}
                                        {selectedFlight.arrivalCode}
                                    </p>
                                    <p>
                                        Thời gian cất cánh: {formatDateTime(selectedFlight.time.departure)} - Thời gian
                                        hạ cánh: {formatDateTime(selectedFlight.time.arrival)}
                                    </p>
                                    <p>{flights.tickets.seatMapping.price.toLocaleString()} VND/ Khách </p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TicketPlane;
