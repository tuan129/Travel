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

function TicketPlane() {
    const location = useLocation();
    const navigate = useNavigate();
    const { flights, returnFlights, seatClass, adultCount, childCount, infantCount, totalCustomer } = location.state;

    console.log(flights, returnFlights);

    const seatMapping = seatClassMapping(seatClass);

    const [selectedFlight, setSelectedFlight] = useState(null);
    const [isSelectingReturn, setIsSelectingReturn] = useState(false);
    const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);

    const handleDetailClick = (index) => {
        if (selectedFlight === index) {
            // Nếu đã chọn chuyến bay này rồi, ẩn chi tiết
            setSelectedFlight(null);
        } else {
            // Nếu chọn chuyến bay khác, hiển thị chi tiết
            setSelectedFlight(index);
        }
    };

    const handleSelectDepartureFlight = (flight) => {
        if (!returnFlights) {
            navigate('/infocustomer', {
                state: {
                    flight,
                    adultCount,
                    childCount,
                    infantCount,
                    totalCustomer,
                    seatMapping,
                },
            });
        } else {
            setSelectedDepartureFlight(flight);
            // console.log(flight);
            setIsSelectingReturn(true);
        }
    };

    const handleSelectClick = (returnFlight) => {
        // Điều hướng đến trang InfoCustomer và truyền thông tin chuyến bay cùng số lượng hành khách
        navigate('/infocustomer', {
            state: {
                flight: selectedDepartureFlight,
                returnFlight,
                adultCount,
                childCount,
                infantCount,
                totalCustomer,
                seatMapping,
            },
        });
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <ul className={cx('list-tickets')}>
                    <h1>Danh sách các chuyến bay</h1>
                    {!isSelectingReturn &&
                        flights.map((flight, index) => (
                            <li key={index} className={cx('ticket-item')}>
                                <div className={cx('info-ticket')}>
                                    <p>{flight.airlines}</p>
                                    <p className={cx('place')}>
                                        {flight.airfield.from.city} - {flight.airfield.to.city}
                                        <br />
                                        <span className={cx('time')}>
                                            {formatDateTime(flight.time.departure)} {' - '}
                                            {formatDateTime(flight.time.arrival)}
                                        </span>
                                    </p>
                                    <p className={cx('money')}>
                                        Giá vé:
                                        {flight.tickets[seatMapping].price.toLocaleString()} VND
                                    </p>
                                </div>
                                <div className={cx('btn-handle')}>
                                    <Button className={cx('details')} onClick={() => handleDetailClick(index)}>
                                        Chi tiết
                                    </Button>
                                    <Button primary onClick={() => handleSelectDepartureFlight(flight)}>
                                        Chọn
                                    </Button>
                                </div>
                                {selectedFlight === index && (
                                    <div className={cx('flight-details')}>
                                        <h2>Chi tiết chuyến bay</h2>
                                        <p>Hãng hàng không: {flight.airlines}</p>
                                        <p>Mã chuyến bay: {flight.flightCode}</p>
                                        <p>
                                            Thành phố cất cánh: {flight.airfield.from.city} {flight.departureCode}
                                        </p>
                                        <p>
                                            Thành phố hạ cánh: {flight.airfield.to.city} {flight.arrivalCode}
                                        </p>
                                        <p>
                                            Thời gian cất cánh: {formatDateTime(flight.time.departure)} - Thời gian hạ
                                            cánh: {formatDateTime(flight.time.arrival)}
                                        </p>
                                        <p>{flight.tickets[seatMapping].price.toLocaleString()} VND/ Khách </p>
                                    </div>
                                )}
                            </li>
                        ))}

                    {isSelectingReturn &&
                        returnFlights.map((returnFlight, index) => (
                            <li key={index} className={cx('ticket-item')}>
                                <div className={cx('info-ticket')}>
                                    <p>{returnFlight.airlines}</p>
                                    <p className={cx('place')}>
                                        {returnFlight.airfield.from.city} - {returnFlight.airfield.to.city}
                                        <br />
                                        <span className={cx('time')}>
                                            {formatDateTime(returnFlight.time.departure)} {' - '}
                                            {formatDateTime(returnFlight.time.arrival)}
                                        </span>
                                    </p>
                                    <p className={cx('money')}>
                                        Giá vé: {returnFlight.tickets[seatMapping].price.toLocaleString()} VND
                                    </p>
                                </div>
                                <div className={cx('btn-handle')}>
                                    <Button className={cx('details')} onClick={() => handleDetailClick(index)}>
                                        Chi tiết
                                    </Button>
                                    <Button primary onClick={() => handleSelectClick(returnFlight)}>
                                        Chọn
                                    </Button>
                                </div>
                                {selectedFlight === index && (
                                    <div className={cx('flight-details')}>
                                        <h2>Chi tiết chuyến bay</h2>
                                        <p>Hãng hàng không: {returnFlight.airlines}</p>
                                        <p>Mã chuyến bay: {returnFlight.flightCode}</p>
                                        <p>
                                            Thành phố cất cánh: {returnFlight.airfield.from.city}{' '}
                                            {returnFlight.departureCode}
                                        </p>
                                        <p>
                                            Thành phố hạ cánh: {returnFlight.airfield.to.city}{' '}
                                            {returnFlight.arrivalCode}
                                        </p>
                                        <p>
                                            Thời gian cất cánh: {formatDateTime(returnFlight.time.departure)} - Thời
                                            gian hạ cánh: {formatDateTime(returnFlight.time.arrival)}
                                        </p>
                                        <p>{returnFlight.tickets[seatMapping].price.toLocaleString()} VND/ Khách </p>
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
