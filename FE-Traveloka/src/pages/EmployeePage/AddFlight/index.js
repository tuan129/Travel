//Hook
import { useState, useContext } from 'react';

//Styles
import styles from './AddFlight.module.scss';

// Component
import Button from '~/components/Button';
import CityItems from '~/components/CityItems';
import AirlineItems from '~/components/AirlineItems';
import { Wrapper as PoperWrapper } from '~/components/Poper';
import Context from '~/components/useContext/Context';

// Library
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function AddFlight() {
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [showAirlineResults, setShowAirlineResults] = useState(false);
    const [airlineResults, setAirlineResults] = useState([]);
    const [airlines, setAirlines] = useState('');
    const [loading, setLoading] = useState(false);
    const { addFlight } = useContext(Context);
    const navigate = useNavigate();

    // State để lấy các input filds
    const [flightNumber, setFlightNumber] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [economyTickets, setEconomyTickets] = useState('');
    const [premiumEconomyTickets, setPremiumEconomyTickets] = useState('');
    const [businessTickets, setBusinessTickets] = useState('');
    const [firstClassTickets, setFirstClassTickets] = useState('');
    const [economyPrice, setEconomyPrice] = useState('');
    const [premiumEconomyPrice, setPremiumEconomyPrice] = useState('');
    const [businessPrice, setBusinessPrice] = useState('');
    const [firstClassPrice, setFirstClassPrice] = useState('');

    const fetchAirports = async (query) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/api/search?keyword=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            setSearchResults(data.results);
            setShowSearchResults(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
            setShowSearchResults(false);
        } finally {
            setLoading(false);
        }
    };

    const fetchAirlines = async (query) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:3001/api/airlines?keyword=${query}`);
            if (!response.ok) {
                throw new Error('Failed to fetch search results');
            }
            const data = await response.json();
            setAirlineResults(data.results);
            setShowAirlineResults(true);
        } catch (error) {
            console.error('Error fetching search results:', error);
            setAirlineResults([]);
            setShowAirlineResults(false);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e, type) => {
        const query = e.target.value;
        if (type === 'departure') {
            setDepartureCity(query);
            if (query.length > 0) {
                fetchAirports(query);
            } else {
                setShowSearchResults(false);
            }
        } else if (type === 'arrival') {
            setArrivalCity(query);
            if (query.length > 0) {
                fetchAirports(query);
            } else {
                setShowSearchResults(false);
            }
        } else if (type === 'airlines') {
            setAirlines(query);
            if (query.length > 0) {
                fetchAirlines(query);
            } else {
                setShowAirlineResults(false);
            }
        }
    };

    const handleSelect = (item, type) => {
        if (type === 'departure') {
            setDepartureCity(`${item.name}`);
        } else if (type === 'arrival') {
            setArrivalCity(`${item.name}`);
        } else if (type === 'airlines') {
            setAirlines(`${item.fullName}`);
        }
        setShowSearchResults(false);
        setShowAirlineResults(false);
    };

    const handleAddFlight = async () => {
        const flightData = {
            flightNumber,
            airlines,
            departureCity,
            arrivalCity,
            departureTime,
            arrivalTime,
            departureDate,
            tickets: {
                economy: economyTickets,
                premiumEconomy: premiumEconomyTickets,
                business: businessTickets,
                firstClass: firstClassTickets,
            },
            prices: {
                economy: economyPrice,
                premiumEconomy: premiumEconomyPrice,
                business: businessPrice,
                firstClass: firstClassPrice,
            },
        };

        try {
            // Gửi dữ liệu đến backend

            // await axios.post('http://localhost:3001/api/flights', flightData);

            // Nếu thành công, làm trống form
            setFlightNumber('');
            setAirlines('');
            setDepartureCity('');
            setArrivalCity('');
            setDepartureTime('');
            setArrivalTime('');
            setDepartureDate('');
            setEconomyTickets('');
            setPremiumEconomyTickets('');
            setBusinessTickets('');
            setFirstClassTickets('');
            setEconomyPrice('');
            setPremiumEconomyPrice('');
            setBusinessPrice('');
            setFirstClassPrice('');

            // Thêm dữ liệu vào context
            addFlight(flightData);
            // Chuyển đến trang danh sách chuyến bay
            navigate('/listfilght');
            // Có thể thông báo thành công
            alert('Flight added successfully!');
        } catch (error) {
            console.error('Error adding flight:', error);
            // Có thể thông báo lỗi nếu cần
            alert('Failed to add flight. Please try again.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>Add Flight</h1>
                <div className={cx('add-flight')}>
                    <div className={cx('flight-info')}>
                        <label>
                            <span>- Mã chuyến bay:</span>
                            <input
                                type="text"
                                placeholder="Flight Number"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                            />
                        </label>
                        <div>
                            <label>
                                <span>- Hãng hàng không:</span>
                                <Tippy
                                    placement="bottom-start"
                                    interactive
                                    visible={showAirlineResults && airlines.length > 0}
                                    render={(attrs) => (
                                        <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                            <PoperWrapper>
                                                <h3>Hãng hàng không:</h3>
                                                <div className={cx('airline-items-list')}>
                                                    {loading ? (
                                                        <div>Loading...</div>
                                                    ) : (
                                                        airlineResults.map((airline) => (
                                                            <AirlineItems
                                                                key={airline.id}
                                                                data={airline}
                                                                onClick={() => handleSelect(airline, 'airlines')}
                                                            />
                                                        ))
                                                    )}
                                                </div>
                                            </PoperWrapper>
                                        </div>
                                    )}
                                >
                                    <input
                                        type="text"
                                        placeholder="Airlines"
                                        value={airlines}
                                        onFocus={() => setShowAirlineResults(true)}
                                        onChange={(e) => handleInputChange(e, 'airlines')}
                                    />
                                </Tippy>
                            </label>
                        </div>
                        <div>
                            <label>
                                <span>- Sân bay khởi hành:</span>
                                <Tippy
                                    placement="bottom-start"
                                    interactive
                                    visible={showSearchResults && departureCity.length > 0}
                                    render={(attrs) => (
                                        <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                            <PoperWrapper>
                                                <h3>Các sân bay:</h3>
                                                <div className={cx('city-items-list')}>
                                                    {loading ? (
                                                        <div>Loading...</div>
                                                    ) : (
                                                        searchResults.map((airport) => (
                                                            <CityItems
                                                                key={airport.id}
                                                                data={airport}
                                                                onClick={() => handleSelect(airport, 'departure')}
                                                            />
                                                        ))
                                                    )}
                                                </div>
                                            </PoperWrapper>
                                        </div>
                                    )}
                                >
                                    <input
                                        type="text"
                                        placeholder="Departure City"
                                        value={departureCity}
                                        onFocus={() => setShowSearchResults(true)}
                                        onChange={(e) => handleInputChange(e, 'departure')}
                                    />
                                </Tippy>
                            </label>
                        </div>

                        <label>
                            <span>- Thời gian cất cánh:</span>
                            <input
                                type="time"
                                placeholder="Departure Time"
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                            />
                        </label>
                        <label className={cx('amount-ticket')}>
                            <span>- Số lượng vé:</span>
                            <div className={cx('level-ticket')}>
                                <input
                                    type="text"
                                    placeholder="Phổ thông"
                                    value={economyTickets}
                                    onChange={(e) => setEconomyTickets(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Phổ thông đặc biệt"
                                    value={premiumEconomyTickets}
                                    onChange={(e) => setPremiumEconomyTickets(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Thương gia"
                                    value={businessTickets}
                                    onChange={(e) => setBusinessTickets(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Hạng nhất"
                                    value={firstClassTickets}
                                    onChange={(e) => setFirstClassTickets(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                    <div className={cx('flight-info')}>
                        <label>
                            <span>- Ngày khởi hành:</span>
                            <input
                                type="date"
                                placeholder="Departure Date"
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                            />
                        </label>
                        <div>
                            <label>
                                <span>- Sân bay đến:</span>
                                <Tippy
                                    placement="bottom-start"
                                    interactive
                                    visible={showSearchResults && arrivalCity.length > 0}
                                    render={(attrs) => (
                                        <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                            <PoperWrapper>
                                                <h3>Các sân bay:</h3>
                                                <div className={cx('city-items-list')}>
                                                    {loading ? (
                                                        <div>Loading...</div>
                                                    ) : (
                                                        searchResults.map((airport) => (
                                                            <CityItems
                                                                key={airport.id}
                                                                data={airport}
                                                                onClick={() => handleSelect(airport, 'arrival')}
                                                            />
                                                        ))
                                                    )}
                                                </div>
                                            </PoperWrapper>
                                        </div>
                                    )}
                                >
                                    <input
                                        type="text"
                                        placeholder="Arrival City"
                                        value={arrivalCity}
                                        onFocus={() => setShowSearchResults(true)}
                                        onChange={(e) => handleInputChange(e, 'arrival')}
                                    />
                                </Tippy>
                            </label>
                        </div>
                        <label>
                            <span>- Thời gian đến:</span>
                            <input
                                type="time"
                                placeholder="Arrival Time"
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                            />
                        </label>
                        <label className={cx('price-ticket')}>
                            <span>- Giá vé:</span>
                            <div className={cx('level-ticket')}>
                                <input
                                    type="text"
                                    placeholder="Phổ thông"
                                    value={economyPrice}
                                    onChange={(e) => setEconomyPrice(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Phổ thông đặc biệt"
                                    value={premiumEconomyPrice}
                                    onChange={(e) => setPremiumEconomyPrice(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Thương gia"
                                    value={businessPrice}
                                    onChange={(e) => setBusinessPrice(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Hạng nhất"
                                    value={firstClassPrice}
                                    onChange={(e) => setFirstClassPrice(e.target.value)}
                                />
                            </div>
                        </label>
                    </div>
                </div>
                <Button primary className={cx('btn-add-flight')} onClick={handleAddFlight}>
                    Add
                </Button>
            </div>
        </div>
    );
}

export default AddFlight;
