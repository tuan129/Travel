import { useEffect, useState } from 'react';

// component
import styles from './ListFilght.module.scss';
import Button from '~/components/Button';

// library
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

function ListFlight() {
    const [flights, setFlights] = useState([]); // Khởi tạo state cho danh sách chuyến bay
    const [editingFlight, setEditingFlight] = useState(null); // State để lưu chuyến bay đang chỉnh sửa
    const [editData, setEditData] = useState({}); // State để lưu dữ liệu chỉnh sửa

    const formatDate = (isoString) => {
        return format(new Date(isoString), 'dd/MM/yyyy');
    };

    const formatTime = (isoString) => {
        return format(new Date(isoString), 'HH:mm');
    };

    // Hàm xóa chuyến bay
    const handleDelete = async (flightNumber) => {
        try {
            await axios.delete(`http://localhost:5000/api/flight/${flightNumber}`);
            setFlights((prevFlights) => prevFlights.filter((flight) => flight.flightNumber !== flightNumber));
        } catch (error) {
            console.error('Error deleting flight:', error);
            alert('Failed to delete flight. Please try again.');
        }
    };

    // Hàm bắt đầu chỉnh sửa chuyến bay
    const handleEdit = (flight) => {
        setEditingFlight(flight._id);
        setEditData(flight);
    };
    // Hàm hủy chỉnh sửa
    const handleCancel = () => {
        setEditingFlight(null);
    };

    // Hàm lưu chuyến bay đã chỉnh sửa
    const handleSave = async () => {
        // try {
        //     await axios.patch(`http://localhost:5000/api/flight/${editingFlight}`, editData);
        //     setFlights((prevFlights) =>
        //         prevFlights.map((flight) => (flight._id === editingFlight ? editData : flight)),
        //     );
        //     setEditingFlight(null);
        // } catch (error) {
        //     console.error('Error updating flight:', error);
        //     alert('Failed to update flight. Please try again.');
        // }
        console.log(editData);
    };

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/flight/dashboard');
                setFlights(res.data.data.flight);
            } catch (err) {
                console.error('Error fetching flights:', err);
                setFlights([]);
            }
        };
        fetchFlights();
    }, []);

    // Hàm xử lý thay đổi dữ liệu trong form chỉnh sửa
    const handleInputChange = (newData, field) => {
        if (field.includes('.')) {
            const [parentField, subField, childField] = field.split('.');
            if (parentField === 'time') {
                const dateValue = new Date();
                setEditData({
                    ...editData,
                    [parentField]: {
                        ...editData[parentField],
                        [subField]: {
                            ...editData[parentField][subField],
                            [childField]: dateValue.toISOString(),
                        },
                    },
                });
            } else {
                setEditData({
                    ...editData,
                    [parentField]: {
                        ...editData[parentField],
                        [subField]: {
                            ...editData[parentField][subField],
                            [childField]: newData.target.value,
                        },
                    },
                });
            }
        } else {
            setEditData({ ...editData, [field]: newData.target.value });
        }
    };

    return (
        <div className={cx('wrapper-list-flight')}>
            <div className={cx('content')}>
                <h1>Danh sách các chuyến bay:</h1>
                <div className={cx('list-flight')}>
                    <ul className={cx('list-flight-items')}>
                        {flights.map((flight) => (
                            <li key={flight._id} className={cx('flight-item')}>
                                {editingFlight === flight._id ? (
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
                                                Mã chuyến bay
                                                <input
                                                    type="text"
                                                    value={editData.flightCode}
                                                    onChange={(e) => handleInputChange(e, 'flightCode')}
                                                    className={cx('input-edit')}
                                                />
                                            </label>
                                        </div>
                                        <label className={cx('place')}>
                                            Khởi hành
                                            <input
                                                type="text"
                                                value={editData.airfield.from.city}
                                                onChange={(e) => handleInputChange(e, 'airfield.from.city')}
                                                className={cx('input-edit')}
                                            />
                                        </label>
                                        <label>
                                            To
                                            <input
                                                type="text"
                                                value={editData.airfield.to.city}
                                                onChange={(e) => handleInputChange(e, 'airfield.to.city')}
                                                className={cx('input-edit')}
                                            />
                                        </label>
                                        <label className={cx('time')}>
                                            Time
                                            <input
                                                type="time"
                                                value={editData.time.departure}
                                                onChange={(e) => handleInputChange(e, 'time.departure')}
                                                className={cx('input-edit')}
                                            />
                                            - To -
                                            <input
                                                type="time"
                                                value={editData.time.arrival}
                                                onChange={(e) => handleInputChange(e, 'time.arrival')}
                                                className={cx('input-edit')}
                                            />
                                        </label>
                                        <label className={cx('date-departure')}>
                                            Date
                                            <input
                                                type="date"
                                                value={editData.date}
                                                onChange={(e) => handleInputChange(e, 'date')}
                                                className={cx('input-edit')}
                                            />
                                        </label>
                                        <div className={cx('ticket-price-edit')}>
                                            <span>- Giá vé:</span>
                                            <label className={cx('label-edit')}>
                                                + Phổ thông:
                                                <input
                                                    type="text"
                                                    value={editData.tickets.phoThong.price}
                                                    onChange={(e) => handleInputChange(e, 'tickets.phoThong.price')}
                                                    className={cx('input-edit')}
                                                />
                                                VNĐ
                                                <input
                                                    type="text"
                                                    value={editData.tickets.phoThong.soLuongVe}
                                                    onChange={(e) => handleInputChange(e, 'tickets.phoThong.soLuongVe')}
                                                    className={cx('input-edit')}
                                                />
                                                Vé
                                            </label>
                                            <label className={cx('label-edit')}>
                                                + Phổ thông đặc biệt:
                                                <input
                                                    type="text"
                                                    value={editData.tickets.phoThongDacBiet.price}
                                                    onChange={(e) =>
                                                        handleInputChange(e, 'tickets.phoThongDacBiet.price')
                                                    }
                                                    className={cx('input-edit')}
                                                />
                                                VNĐ
                                                <input
                                                    type="text"
                                                    value={editData.tickets.phoThongDacBiet.soLuongVe}
                                                    onChange={(e) =>
                                                        handleInputChange(e, 'tickets.phoThongDacBiet.soLuongVe')
                                                    }
                                                    className={cx('input-edit')}
                                                />
                                                Vé
                                            </label>
                                            <label className={cx('label-edit')}>
                                                + Thương gia:
                                                <input
                                                    type="text"
                                                    value={editData.tickets.thuongGia.price}
                                                    onChange={(e) => handleInputChange(e, 'tickets.thuongGia.price')}
                                                    className={cx('input-edit')}
                                                />
                                                VNĐ
                                                <input
                                                    type="text"
                                                    value={editData.tickets.thuongGia.soLuongVe}
                                                    onChange={(e) =>
                                                        handleInputChange(e, 'tickets.thuongGia.soLuongVe')
                                                    }
                                                    className={cx('input-edit')}
                                                />
                                                Vé
                                            </label>
                                            <label className={cx('label-edit')}>
                                                + Hạng nhất:
                                                <input
                                                    type="text"
                                                    value={editData.tickets.hangNhat.price}
                                                    onChange={(e) => handleInputChange(e, 'tickets.hangNhat.price')}
                                                    className={cx('input-edit')}
                                                />
                                                VNĐ
                                                <input
                                                    type="text"
                                                    value={editData.tickets.hangNhat.soLuongVe}
                                                    onChange={(e) => handleInputChange(e, 'tickets.hangNhat.soLuongVe')}
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
                                            <span className={cx('flight-number')}>{flight.flightCode}</span>
                                            <Button
                                                className={cx('btn-delete')}
                                                leftIcon={<FontAwesomeIcon className={cx('icon')} icon={faTrashCan} />}
                                                onClick={() => handleDelete(flight.flightCode)}
                                            />
                                            <Button text className={cx('bnt-edit')} onClick={() => handleEdit(flight)}>
                                                Edit
                                            </Button>
                                        </div>
                                        <p className={cx('place')}>
                                            Khởi hành: {flight.airfield.from.city} - {flight.airfield.from.nameAirfield}{' '}
                                            ({flight.airfield.from.codeAirfield})
                                        </p>
                                        <p>
                                            Hạ cánh: {flight.airfield.to.city} - {flight.airfield.to.nameAirfield} (
                                            {flight.airfield.to.codeAirfield})
                                        </p>
                                        <p className={cx('time')}>
                                            Thời gian: {formatTime(flight.time.departure)} -{' '}
                                            {formatTime(flight.time.arrival)}
                                        </p>
                                        <p className={cx('date-departure')}>
                                            Ngày khởi hành: {formatDate(flight.date)}
                                        </p>
                                        <div className={cx('ticket-price')}>
                                            <span className={cx('text-price')}>Giá vé:</span>
                                            <p className={cx('economy')}>
                                                Phổ thông: {flight.tickets.phoThong.price} VNĐ -{' '}
                                                {flight.tickets.phoThong.soLuongVe} Vé
                                            </p>
                                            <p className={cx('premiumEconomy')}>
                                                Phổ thông đặc biệt: {flight.tickets.phoThongDacBiet.price} VNĐ -{' '}
                                                {flight.tickets.phoThongDacBiet.soLuongVe} Vé
                                            </p>
                                            <p className={cx('business')}>
                                                Thương gia: {flight.tickets.thuongGia.price} VNĐ -{' '}
                                                {flight.tickets.thuongGia.soLuongVe} Vé
                                            </p>
                                            <p className={cx('firstClass')}>
                                                Hạng nhất: {flight.tickets.hangNhat.price} VNĐ -{' '}
                                                {flight.tickets.hangNhat.soLuongVe} Vé
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
