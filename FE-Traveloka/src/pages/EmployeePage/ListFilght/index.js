import { useCallback, useEffect, useState } from 'react';
//Component
import styles from './ListFilght.module.scss';
import Button from '~/components/Button';
import { Wrapper as PoperWrapper } from '~/components/Poper';
import CityItems from '~/components/CityItems';
//Library
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { format } from 'date-fns';
const cx = classNames.bind(styles);

function ListFlight() {
    const [flights, setFlights] = useState([]);
    const [idFlight, setIdFlight] = useState(null);
    const [editData, setEditData] = useState({});
    const [showAirfiled, setShowAirfiled] = useState(false);
    const [searchAirfield, setSearchAirfield] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    const formatDate = (isoString) => {
        return format(new Date(isoString), 'dd/MM/yyyy');
    };
    const formatTime = (isoString) => {
        return format(new Date(isoString), 'HH:mm');
    };
    const handleDelete = async (flightNumber) => {
        try {
            await axios.delete(`http://localhost:4000/api/flight/${flightNumber}`);
            setFlights((prevFlights) => prevFlights.filter((flight) => flight.flightNumber !== flightNumber));
        } catch (error) {
            console.error('Error deleting flight:', error);
            alert('Failed to delete flight. Please try again.');
        }
    };

    const handleEdit = (flight) => {
        setIdFlight(flight._id);
        setEditData(flight);
    };

    const handleSave = async () => {
        try {
            const dataUpdate = {
                airlines: editData.airlines,
                flightCode: editData.flightCode,
                airfield: {
                    from: editData.airfield.from.id || editData.airfield.from._id,
                    to: editData.airfield.to.id || editData.airfield.to._id,
                },
                time: {
                    departure: editData.time.departure,
                    arrival: editData.time.arrival,
                },
                date: editData.date,
                tickets: {
                    phoThong: {
                        price: editData.tickets.phoThong.price,
                        soLuongVe: editData.tickets.phoThong.soLuongVe,
                    },
                    phoThongDacBiet: {
                        price: editData.tickets.phoThongDacBiet.price,
                        soLuongVe: editData.tickets.phoThongDacBiet.soLuongVe,
                    },
                    thuongGia: {
                        price: editData.tickets.thuongGia.price,
                        soLuongVe: editData.tickets.thuongGia.soLuongVe,
                    },
                    hangNhat: {
                        price: editData.tickets.hangNhat.price,
                        soLuongVe: editData.tickets.hangNhat.soLuongVe,
                    },
                },
            };

            // await axios.patch(`http://localhost:4000/api/flight/${idFlight}`, dataUpdate);
            console.log(dataUpdate);
            // setIdFlight(null);
            // window.location.reload();
        } catch (err) {
            console.error('Error saving flight:', err);
            alert('Failed to save flight. Please try again.');
        }
    };

    const handleCancel = () => {
        setIdFlight(null);
    };

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/flight/dashboard');
                setFlights(res.data.data.flight);
            } catch (err) {
                console.error('Error fetching flights:', err);
                setFlights([]);
            }
        };
        fetchFlights();
    }, []);

    useEffect(() => {
        const search = async () => {
            try {
                const res = await axios.get(`http://localhost:4000/api/airfield/search?keyword=${searchKeyword}`);
                const data = res.data;
                setSearchAirfield(data.data.airfields);
                setShowAirfiled(true);
            } catch (err) {
                console.log('Error fetching search results:', err);
                setSearchAirfield([]);
                setShowAirfiled(false);
            }
        };
        if (searchKeyword.length > 0) {
            search();
        } else {
            setShowAirfiled(false);
        }
    }, [searchKeyword]);

    const handleChange = (e, type) => {
        const keyword = e.target.value;
        setSearchKeyword(keyword);
        if (type === 'departure') {
            setEditData((prevData) => ({
                ...prevData,
                airfield: {
                    ...prevData.airfield,
                    from: {
                        ...prevData.airfield.from,
                        city: keyword,
                    },
                },
            }));
        } else if (type === 'arrival') {
            setEditData((prevData) => ({
                ...prevData,
                airfield: {
                    ...prevData.airfield,
                    to: {
                        ...prevData.airfield.to,
                        city: keyword,
                    },
                },
            }));
        }
    };

    const handleSelect = (airfield, type) => {
        if (type === 'departure') {
            setEditData((prevData) => ({
                ...prevData,
                airfield: {
                    ...prevData.airfield,
                    from: {
                        city: airfield.city,
                        id: airfield._id,
                    },
                },
            }));
        } else if (type === 'arrival') {
            setEditData((prevData) => ({
                ...prevData,
                airfield: {
                    ...prevData.airfield,
                    to: {
                        city: airfield.city,
                        id: airfield._id,
                    },
                },
            }));
        }
        setShowAirfiled(false);
    };
    const handleInputChange = useCallback(
        (newData, field) => {
            if (field.includes('.')) {
                const [parentField, subField] = field.split('.');
                if (parentField === 'time') {
                    const { value } = newData.target;
                    const [hours, minutes] = value.split(':');
                    const timeValue = new Date(`${editData?.date}T${hours}:${minutes}:00`);
                    setEditData((prevData) => ({
                        ...prevData,
                        [parentField]: {
                            ...prevData[parentField],
                            [subField]: timeValue.toISOString(),
                        },
                    }));
                } else {
                    setEditData((prevData) => ({
                        ...prevData,
                        [parentField]: {
                            ...prevData[parentField],
                            [subField]: newData.target.value,
                        },
                    }));
                }
            } else {
                setEditData((prevData) => ({ ...prevData, [field]: newData.target.value }));
            }
        },
        [editData?.date],
    );

    return (
        <div className={cx('wrapper-list-flight')}>
            <div className={cx('content')}>
                <h1>DANH SÁCH CHUYẾN BAY</h1>
                <div className={cx('list-flight')}>
                    <ul className={cx('list-flight-items')}>
                        {flights.map((flight) => (
                            <li key={flight._id} className={cx('flight-item')}>
                                {idFlight === flight._id ? (
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
                                            <span> Sân bay khởi hành</span>
                                            <Tippy
                                                placement="bottom-start"
                                                interactive
                                                render={(attrs) => (
                                                    <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                                        <PoperWrapper>
                                                            <h3>Các sân bay</h3>
                                                            {showAirfiled && (
                                                                <div className={cx('city-items-list')}>
                                                                    {searchAirfield.map((data) => (
                                                                        <CityItems
                                                                            key={data.id}
                                                                            data={data}
                                                                            onClick={() =>
                                                                                handleSelect(data, 'departure')
                                                                            }
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </PoperWrapper>
                                                    </div>
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    value={editData.airfield.from.city}
                                                    onChange={(e) => handleChange(e, 'departure')}
                                                    className={cx('input-edit')}
                                                />
                                            </Tippy>
                                        </label>
                                        <label>
                                            Đến
                                            <Tippy
                                                placement="bottom-start"
                                                interactive
                                                render={(attrs) => (
                                                    <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                                        <PoperWrapper>
                                                            <h3>Các sân bay</h3>
                                                            {showAirfiled && (
                                                                <div className={cx('city-items-list')}>
                                                                    {searchAirfield.map((data) => (
                                                                        <CityItems
                                                                            key={data.id}
                                                                            data={data}
                                                                            onClick={() =>
                                                                                handleSelect(data, 'arrival')
                                                                            }
                                                                        />
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </PoperWrapper>
                                                    </div>
                                                )}
                                            >
                                                <input
                                                    type="text"
                                                    value={editData.airfield.to.city}
                                                    onChange={(e) => handleChange(e, 'arrival')}
                                                    className={cx('input-edit')}
                                                />
                                            </Tippy>
                                        </label>
                                        <label className={cx('date-departure')}>
                                            Ngày
                                            <input
                                                type="date"
                                                value={editData.date}
                                                onChange={(e) => handleInputChange(e, 'date')}
                                                className={cx('input-edit')}
                                            />
                                        </label>
                                        <label className={cx('time')}>
                                            Thời gian
                                            <input
                                                type="time"
                                                value={formatTime(editData.time.departure)}
                                                onChange={(e) => handleInputChange(e, 'time.departure')}
                                                className={cx('input-edit')}
                                            />
                                            -
                                            <input
                                                type="time"
                                                value={formatTime(editData.time.arrival)}
                                                onChange={(e) => handleInputChange(e, 'time.arrival')}
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
                                                SỬA
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
