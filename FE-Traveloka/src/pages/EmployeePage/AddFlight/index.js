//Hook
import { useState, useEffect } from 'react';
//Styles
import styles from './AddFlight.module.scss';
// Component
import Button from '~/components/Button';
import CityItems from '~/components/CityItems';
import AirlineItems from '~/components/AirlineItems';
import { Wrapper as PoperWrapper } from '~/components/Poper';
// Library
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function AddFlight() {
    const navigate = useNavigate();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchAirfieldKeyword, setSearchAirfieldKeyword] = useState('');

    // Sân bay
    const [showAirfiled, setShowAirfiled] = useState(false);
    const [searchAirfield, setSearchAirfield] = useState([]);

    //City
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    // Hãng hàng không
    const [showAirline, setShowAirline] = useState(false);
    const [searchAirline, setSearchAirline] = useState([]);
    const [airlines, setAirlines] = useState('');

    // State để lấy các input fileld
    const [flightCode, setFlightCode] = useState('');
    const [departure, setDeparture] = useState('');
    const [arrival, setArrival] = useState('');
    const [departureDate, setDepartureDate] = useState('');

    // phoThong
    const [pricePhoThong, setPricePhoThong] = useState('');
    const [ticketPhoThong, setTicketPhoThong] = useState('');
    // phoThong dac biet
    const [pricePhoThongDacBiet, setPricePhoThongDacBiet] = useState('');
    const [ticketPhoThongDacBiet, setTicketVePhoThongDacBiet] = useState('');
    // thuong gia
    const [priceThuongGia, setPriceThuongGia] = useState('');
    const [ticketThuongGia, setTicketThuongGia] = useState('');
    // hang nhat
    const [priceHangNhat, setPriceHangNhat] = useState('');
    const [ticketHangNhat, setTicketHangNhat] = useState('');

    useEffect(() => {
        const search = async () => {
            try {
<<<<<<< HEAD
                const res = await axios.get(`http://localhost:5000/api/airfield/search?keyword=${searchKeyword}`);
=======
                const res = await axios.get(`http://localhost:4000/api/airfield/search?keyword=${searchKeyword}`);
>>>>>>> 2a75d80 (Edit form Addflights)
                const data = res.data;
                setSearchAirfield(data.data.airfields);
                setShowAirfiled(true);
            } catch (err) {
                console.error('Error fetching search results:', err);
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

    useEffect(() => {
        const searchAirlines = async () => {
            try {
                const res = await axios.get(
<<<<<<< HEAD
                    `http://localhost:5000/api/airline/search?keyword=${searchAirfieldKeyword}`,
=======
                    `http://localhost:4000/api/airline/search?keyword=${searchAirfieldKeyword}`,
>>>>>>> 2a75d80 (Edit form Addflights)
                );
                const data = res.data;
                setSearchAirline(data.data.airlines);
                setShowAirline(true);
            } catch (err) {
                console.error('Error fetching search results:', err);
                setSearchAirline([]);
                setShowAirline(false);
            }
        };
        if (searchAirfieldKeyword.length > 0) {
            searchAirlines();
        } else {
            setShowAirline(false);
        }
    }, [searchAirfieldKeyword]);

    const handleInputChange = (e, type) => {
        const keyword = e.target.value;
        if (type === 'departure') {
            setFrom(keyword);
            setSearchKeyword(keyword);
        } else if (type === 'arrival') {
            setTo(keyword);
            setSearchKeyword(keyword);
        } else if (type === 'airlines') {
            setAirlines(keyword);
            setSearchAirfieldKeyword(keyword);
        }
    };

    const handleSelect = (airfields, type) => {
        if (type === 'departure') {
            setFrom(`${airfields.city}`);
        } else if (type === 'arrival') {
            setTo(`${airfields.city}`);
        } else if (type === 'airlines') {
            setAirlines(`${airfields.nameAirline}`);
        }
        setShowAirfiled(false);
        setShowAirline(false);
    };

    const handleAddFlight = async () => {
        try {
            if (!from || !to) {
                alert('Vui lòng chọn sân bay khởi hành và đến.');
                return;
            }
            const departureTime = new Date(`${departureDate}T${departure}:00`);
            const arrivalTime = new Date(`${departureDate}T${arrival}:00`);
<<<<<<< HEAD
            await axios.post('http://localhost:5000/api/flight', {
=======
            await axios.post('http://localhost:4000/api/flight', {
>>>>>>> 2a75d80 (Edit form Addflights)
                flightCode,
                airlines,
                airfield: {
                    from,
                    to,
                },
                time: {
                    departure: departureTime,
                    arrival: arrivalTime,
                },
                date: [departureDate],
                tickets: {
                    phoThong: {
                        price: pricePhoThong,
                        soLuongVe: ticketPhoThong,
                    },
                    phoThongDacBiet: {
                        price: pricePhoThongDacBiet,
                        soLuongVe: ticketPhoThongDacBiet,
                    },
                    thuongGia: {
                        price: priceThuongGia,
                        soLuongVe: ticketThuongGia,
                    },
                    hangNhat: {
                        price: priceHangNhat,
                        soLuongVe: ticketHangNhat,
                    },
                },
            });
            alert('Flight added successfully!');
            navigate('/listfilght');
        } catch (err) {
            console.error('Error adding flight:', err);
            alert('Failed to add flight. Please try again.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>ĐIỀN THÔNG TIN CHUYẾN BAY</h1>
                <div className={cx('add-flight')}>
                    <div className={cx('flight-info')}>
                        <label>
                            <span> Mã chuyến bay</span>
                            <input
                                type="text"
                                placeholder="Flight Number"
                                value={flightCode}
                                onChange={(e) => setFlightCode(e.target.value)}
                            />
                        </label>
                        <div>
                            <label>
                                <span> Hãng hàng không</span>
                                <Tippy
                                    placement="bottom-start"
                                    interactive
                                    render={(attrs) => (
                                        <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                            <PoperWrapper>
                                                <h3>Hãng hàng không</h3>
                                                {showAirline && (
                                                    <div className={cx('airline-items-list')}>
                                                        {searchAirline.map((data) => (
                                                            <AirlineItems
                                                                key={data._id}
                                                                data={data}
                                                                onClick={() => handleSelect(data, 'airlines')}
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
                                        placeholder="Airlines"
                                        value={airlines}
                                        onFocus={() => setShowAirline(true)}
                                        onChange={(e) => handleInputChange(e, 'airlines')}
                                    />
                                </Tippy>
                            </label>
                        </div>
                        <div>
                            <label>
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
                                                                onClick={() => handleSelect(data, 'departure')}
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
                                        placeholder="Departure City"
                                        value={from}
                                        onFocus={() => setShowAirfiled(true)}
                                        onChange={(e) => handleInputChange(e, 'departure')}
                                    />
                                </Tippy>
                            </label>
                        </div>

                        <label>
                            <span> Thời gian cất cánh</span>
                            <input
                                type="time"
                                placeholder="Departure Time"
                                value={departure}
                                onChange={(e) => setDeparture(e.target.value)}
                            />
                        </label>
                        <label className={cx('amount-ticket')}>
                            <span> Số lượng vé</span>
                            <div className={cx('level-ticket')}>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': ticketPhoThong.trim() !== '',
                                        })}
                                        htmlFor="economy-tickets"
                                    >
                                        Phổ thông
                                    </label>
                                    <input
                                        id="economy-tickets"
                                        type="text"
                                        placeholder="Phổ thông"
                                        className={cx('field-input')}
                                        value={ticketPhoThong}
                                        onChange={(e) => setTicketPhoThong(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': ticketPhoThongDacBiet.trim() !== '',
                                        })}
                                        htmlFor="premium-economy-tickets"
                                    >
                                        Phổ thông đặc biệt
                                    </label>
                                    <input
                                        id="premium-economy-tickets"
                                        type="text"
                                        placeholder="Phổ thông đặc biệt"
                                        className={cx('field-input')}
                                        value={ticketPhoThongDacBiet}
                                        onChange={(e) => setTicketVePhoThongDacBiet(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': ticketThuongGia.trim() !== '',
                                        })}
                                        htmlFor="business-tickets"
                                    >
                                        Thương gia
                                    </label>
                                    <input
                                        id="business-tickets"
                                        type="text"
                                        placeholder="Thương gia"
                                        className={cx('field-input')}
                                        value={ticketThuongGia}
                                        onChange={(e) => setTicketThuongGia(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': ticketHangNhat.trim() !== '',
                                        })}
                                        htmlFor="first-class-tickets"
                                    >
                                        Hạng nhất
                                    </label>
                                    <input
                                        id="first-class-tickets"
                                        type="text"
                                        placeholder="Hạng nhất"
                                        className={cx('field-input')}
                                        value={ticketHangNhat}
                                        onChange={(e) => setTicketHangNhat(e.target.value)}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                    <div className={cx('flight-info')}>
                        <label>
                            <span> Ngày khởi hành</span>
                            <input
                                type="date"
                                placeholder="Departure Date"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                            />
                        </label>
                        <div>
                            <label>
                                <span> Sân bay đến</span>
                                <Tippy
                                    placement="bottom-start"
                                    interactive
                                    render={(attrs) => (
                                        <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                            <PoperWrapper>
                                                <h3>Các sân bay</h3>
                                                {showAirfiled && (
                                                    <div className={cx('city-items-list')}>
                                                        {searchAirfield.map((airport) => (
                                                            <CityItems
                                                                key={airport.id}
                                                                data={airport}
                                                                onClick={() => handleSelect(airport, 'arrival')}
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
                                        placeholder="Arrival City"
                                        value={to}
                                        onFocus={() => setShowAirfiled(true)}
                                        onChange={(e) => handleInputChange(e, 'arrival')}
                                    />
                                </Tippy>
                            </label>
                        </div>
                        <label>
                            <span> Thời gian đến</span>
                            <input
                                type="time"
                                placeholder="Arrival Time"
                                value={arrival}
                                onChange={(e) => setArrival(e.target.value)}
                            />
                        </label>
                        <label className={cx('price-ticket')}>
                            <span> Giá vé</span>
                            <div className={cx('level-ticket')}>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': pricePhoThong.trim() !== '',
                                        })}
                                        htmlFor="economy-price"
                                    >
                                        Phổ thông
                                    </label>
                                    <input
                                        id="economy-price"
                                        className={cx('field-input')}
                                        type="text"
                                        placeholder="Phổ thông"
                                        value={pricePhoThong}
                                        onChange={(e) => setPricePhoThong(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': pricePhoThongDacBiet.trim() !== '',
                                        })}
                                        htmlFor="premium-economy-price"
                                    >
                                        Phổ thông
                                    </label>
                                    <input
                                        id="premium-economy-price"
                                        type="text"
                                        className={cx('field-input')}
                                        placeholder="Phổ thông đặc biệt"
                                        value={pricePhoThongDacBiet}
                                        onChange={(e) => setPricePhoThongDacBiet(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': priceThuongGia.trim() !== '',
                                        })}
                                        htmlFor="business-price"
                                    >
                                        Phổ thông
                                    </label>
                                    <input
                                        className={cx('field-input')}
                                        id="business-price"
                                        type="text"
                                        placeholder="Thương gia"
                                        value={priceThuongGia}
                                        onChange={(e) => setPriceThuongGia(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': priceHangNhat.trim() !== '',
                                        })}
                                        htmlFor="first-class-price"
                                    >
                                        Phổ thông
                                    </label>
                                    <input
                                        className={cx('field-input')}
                                        id="first-class-price"
                                        type="text"
                                        placeholder="Hạng nhất"
                                        value={priceHangNhat}
                                        onChange={(e) => setPriceHangNhat(e.target.value)}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
                <Button primary className={cx('btn-add-flight')} onClick={handleAddFlight}>
                    THÊM
                </Button>
            </div>
        </div>
    );
}

export default AddFlight;