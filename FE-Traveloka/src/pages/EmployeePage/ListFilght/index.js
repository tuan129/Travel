import { useContext, useState } from 'react';

// component
import styles from './ListFilght.module.scss';
import Context from '~/components/useContext/Context';
import Button from '~/components/Button';

// library
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const cx = classNames.bind(styles);

function ListFlight() {
    const { flights, setFlights } = useContext(Context);
    const [editingFlight, setEditingFlight] = useState(null);
    const [editData, setEditData] = useState({});

    const handleDelete = async (flightNumber) => {
        try {
            await axios.delete(`http://localhost:3001/api/flights/${flightNumber}`);
            setFlights((prevFlights) => prevFlights.filter((flight) => flight.flightNumber !== flightNumber));
        } catch (error) {
            console.error('Error deleting flight:', error);
            alert('Failed to delete flight. Please try again.');
        }
    };

    const handleEdit = (flight) => {
        setEditingFlight(flight.flightNumber);
        setEditData(flight);
    };

    const handleInputChange = (e, field, nestedField) => {
        if (nestedField) {
            setEditData({
                ...editData,
                [field]: { ...editData[field], [nestedField]: e.target.value },
            });
        } else {
            setEditData({ ...editData, [field]: e.target.value });
        }
    };

    const handleSave = async () => {
        try {
            await axios.post(`http://localhost:3001/api/flights/${editingFlight}`, editData);
            setFlights((prevFlights) =>
                prevFlights.map((flight) => (flight.flightNumber === editingFlight ? editData : flight)),
            );
            setEditingFlight(null);
        } catch (error) {
            console.error('Error updating flight:', error);
            alert('Failed to update flight. Please try again.');
        }
    };

    const handleCancel = () => {
        setEditingFlight(null);
    };

    return (
        <div className={cx('wrapper-list-flight')}>
            <div className={cx('content')}>
                <h1>Danh sách các chuyến bay:</h1>
                <div className={cx('list-flight')}>
                    <ul className={cx('list-flight-items')}>
                        {flights.map((flight) => (
                            <li key={flight.flightNumber} className={cx('flight-item')}>
                                {editingFlight === flight.flightNumber ? (
                                    <div className={cx('flight-info-edit')}>
                                        <div className={cx('info-airline-edit')}>
                                            <label>
                                                Hãng hàng không:
                                                <input
                                                    type="text"
                                                    value={editData.airlines}
                                                    onChange={(e) => handleInputChange(e, 'airlines')}
                                                    className={cx('input-edit')}
                                                />
                                            </label>
                                            <label>
                                                Mã chuyến bay:
                                                <input
                                                    type="text"
                                                    value={editData.flightNumber}
                                                    onChange={(e) => handleInputChange(e, 'flightNumber')}
                                                    className={cx('input-edit')}
                                                />
                                            </label>
                                        </div>
                                        <label className={cx('place')}>
                                            - From:
                                            <input
                                                type="text"
                                                value={editData.departureCity}
                                                onChange={(e) => handleInputChange(e, 'departureCity')}
                                                className={cx('input-edit')}
                                            />
                                        </label>
                                        <label>
                                            - To:
                                            <input
                                                type="text"
                                                value={editData.arrivalCity}
                                                onChange={(e) => handleInputChange(e, 'arrivalCity')}
                                                className={cx('input-edit')}
                                            />
                                        </label>
                                        <label className={cx('time')}>
                                            - Time:
                                            <input
                                                type="time"
                                                value={editData.departureTime}
                                                onChange={(e) => handleInputChange(e, 'departureTime')}
                                                className={cx('input-edit')}
                                            />
                                            - To -
                                            <input
                                                type="time"
                                                value={editData.arrivalTime}
                                                onChange={(e) => handleInputChange(e, 'arrivalTime')}
                                                className={cx('input-edit')}
                                            />
                                        </label>
                                        <label className={cx('date-departure')}>
                                            - Date:
                                            <input
                                                type="date"
                                                value={editData.departureDate}
                                                onChange={(e) => handleInputChange(e, 'departureDate')}
                                                className={cx('input-edit')}
                                            />
                                        </label>
                                        <div className={cx('ticket-price-edit')}>
                                            <span>- Giá vé:</span>
                                            <label className={cx('label-edit')}>
                                                + Phổ thông:
                                                <input
                                                    type="text"
                                                    value={editData.prices?.economy || ''}
                                                    onChange={(e) => handleInputChange(e, 'prices', 'economy')}
                                                    className={cx('input-edit')}
                                                />
                                                VNĐ
                                                <input
                                                    type="text"
                                                    value={editData.tickets?.economy || ''}
                                                    onChange={(e) => handleInputChange(e, 'tickets', 'economy')}
                                                    className={cx('input-edit')}
                                                />
                                                Vé
                                            </label>
                                            <label className={cx('label-edit')}>
                                                + Phổ thông đặc biệt:
                                                <input
                                                    type="text"
                                                    value={editData.prices?.premiumEconomy || ''}
                                                    onChange={(e) => handleInputChange(e, 'prices', 'premiumEconomy')}
                                                    className={cx('input-edit')}
                                                />
                                                VNĐ
                                                <input
                                                    type="text"
                                                    value={editData.tickets?.premiumEconomy || ''}
                                                    onChange={(e) => handleInputChange(e, 'tickets', 'premiumEconomy')}
                                                    className={cx('input-edit')}
                                                />
                                                Vé
                                            </label>
                                            <label className={cx('label-edit')}>
                                                + Thương gia:
                                                <input
                                                    type="text"
                                                    value={editData.prices?.business || ''}
                                                    onChange={(e) => handleInputChange(e, 'prices', 'business')}
                                                    className={cx('input-edit')}
                                                />
                                                VNĐ
                                                <input
                                                    type="text"
                                                    value={editData.tickets?.business || ''}
                                                    onChange={(e) => handleInputChange(e, 'tickets', 'business')}
                                                    className={cx('input-edit')}
                                                />
                                                Vé
                                            </label>
                                            <label className={cx('label-edit')}>
                                                + Hạng nhất:
                                                <input
                                                    type="text"
                                                    value={editData.prices?.firstClass || ''}
                                                    onChange={(e) => handleInputChange(e, 'prices', 'firstClass')}
                                                    className={cx('input-edit')}
                                                />
                                                VNĐ
                                                <input
                                                    type="text"
                                                    value={editData.tickets?.firstClass || ''}
                                                    onChange={(e) => handleInputChange(e, 'tickets', 'firstClass')}
                                                    className={cx('input-edit')}
                                                />
                                                Vé
                                            </label>
                                            <div className={cx('btns')}>
                                                <Button primary className={cx('btn-save')} onClick={handleSave}>
                                                    Save
                                                </Button>
                                                <Button outline className={cx('btn-cancel')} onClick={handleCancel}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className={cx('flight-info')}>
                                        <div className={cx('info-airline')}>
                                            <p className={cx('name-airline')}>{flight.airlines}:</p>
                                            <span className={cx('flight-number')}>{flight.flightNumber}</span>

                                            <Button
                                                className={cx('btn-delete')}
                                                leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faTrashCan} />}
                                                onClick={() => handleDelete(flight.flightNumber)}
                                            ></Button>
                                            <Button text className={cx('bnt-edit')} onClick={() => handleEdit(flight)}>
                                                Edit
                                            </Button>
                                        </div>
                                        <p className={cx('place')}>- From: {flight.departureCity}</p>
                                        <p>- To: {flight.arrivalCity}</p>
                                        <p className={cx('time')}>
                                            - Time: {flight.departureTime} - {flight.arrivalTime}
                                        </p>
                                        <p className={cx('date-departure')}>- Date: {flight.departureDate}</p>
                                        <div className={cx('ticket-price')}>
                                            <span>- Giá vé:</span>
                                            <p>
                                                + Phổ thông: {flight.prices.economy} VNĐ
                                                <span className={cx('amount-ticket')}>{flight.tickets.economy} Vé</span>
                                            </p>
                                            <p>
                                                + Phổ thông đặc biệt: {flight.prices.premiumEconomy} VNĐ
                                                <span className={cx('amount-ticket')}>
                                                    {flight.tickets.premiumEconomy} Vé
                                                </span>
                                            </p>
                                            <p>
                                                + Thương gia: {flight.prices.business} VNĐ
                                                <span className={cx('amount-ticket')}>
                                                    {flight.tickets.business} Vé
                                                </span>
                                            </p>
                                            <p>
                                                + Hạng nhất: {flight.prices.firstClass} VNĐ
                                                <span className={cx('amount-ticket')}>
                                                    {flight.tickets.firstClass} Vé
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ListFlight;
