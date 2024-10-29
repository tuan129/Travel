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
    const navigate = useNavigate();

    // Sân bay
    const [showAirfiledResults, setShowAirfiledResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    //City
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');

    // Hãng hàng không
    const [showAirlineResults, setShowAirlineResults] = useState(false);
    const [airlineResults, setAirlineResults] = useState([]);

    //Biến tạm
    const { addFlight } = useContext(Context);

    // State để lấy các input fileld
    const [flightNumber, setFlightNumber] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureDate, setDepartureDate] = useState('');
    const [airlines, setAirlines] = useState('');
    // Vé
    const [economyTickets, setEconomyTickets] = useState('');
    const [premiumEconomyTickets, setPremiumEconomyTickets] = useState('');
    const [businessTickets, setBusinessTickets] = useState('');
    const [firstClassTickets, setFirstClassTickets] = useState('');
    //Giá
    const [economyPrice, setEconomyPrice] = useState('');
    const [premiumEconomyPrice, setPremiumEconomyPrice] = useState('');
    const [businessPrice, setBusinessPrice] = useState('');
    const [firstClassPrice, setFirstClassPrice] = useState('');

    const searchAirports = async () => {};

    const searchAirlines = async () => {};

    const handleInputChange = (e, type) => {
        const query = e.target.value;
        if (type === 'departure') {
            setDepartureCity(query);
            if (query.length > 0) {
                searchAirports(query);
            } else {
                setShowAirfiledResults(false);
            }
        } else if (type === 'arrival') {
            setArrivalCity(query);
            if (query.length > 0) {
                searchAirports(query);
            } else {
                setShowAirfiledResults(false);
            }
        } else if (type === 'airlines') {
            setAirlines(query);
            if (query.length > 0) {
                searchAirlines(query);
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
        setShowAirfiledResults(false);
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
            // await axios.post('http://localhost:3001/api/flights', flightData);
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

            addFlight(flightData);
            navigate('/listfilght');
            alert('Flight added successfully!');
        } catch (error) {
            console.error('Error adding flight:', error);
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
                            <span> Mã chuyến bay</span>
                            <input
                                type="text"
                                placeholder="Flight Number"
                                value={flightNumber}
                                onChange={(e) => setFlightNumber(e.target.value)}
                            />
                        </label>
                        <div>
                            <label>
                                <span> Hãng hàng không</span>
                                <Tippy
                                    placement="bottom-start"
                                    interactive
                                    visible={showAirlineResults && airlines.length > 0}
                                    render={(attrs) => (
                                        <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                            <PoperWrapper>
                                                <h3>Hãng hàng không</h3>
                                                <div className={cx('airline-items-list')}>
                                                    {airlineResults.map((airline) => (
                                                        <AirlineItems
                                                            key={airline._id}
                                                            data={airline}
                                                            onClick={() => handleSelect(airline, 'airlines')}
                                                        />
                                                    ))}
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
                                <span> Sân bay khởi hành</span>
                                <Tippy
                                    placement="bottom-start"
                                    interactive
                                    visible={showAirfiledResults && departureCity.length > 0}
                                    render={(attrs) => (
                                        <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                            <PoperWrapper>
                                                <h3>Các sân bay</h3>
                                                <div className={cx('city-items-list')}>
                                                    {searchResults.map((airport) => (
                                                        <CityItems
                                                            key={airport.id}
                                                            data={airport}
                                                            onClick={() => handleSelect(airport, 'departure')}
                                                        />
                                                    ))}
                                                </div>
                                            </PoperWrapper>
                                        </div>
                                    )}
                                >
                                    <input
                                        type="text"
                                        placeholder="Departure City"
                                        value={departureCity}
                                        onFocus={() => setShowAirfiledResults(true)}
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
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                            />
                        </label>
                        <label className={cx('amount-ticket')}>
                            <span> Số lượng vé</span>
                            <div className={cx('level-ticket')}>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': economyTickets.trim() !== '',
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
                                        value={economyTickets}
                                        onChange={(e) => setEconomyTickets(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': premiumEconomyTickets.trim() !== '',
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
                                        value={premiumEconomyTickets}
                                        onChange={(e) => setPremiumEconomyTickets(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': businessTickets.trim() !== '',
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
                                        value={businessTickets}
                                        onChange={(e) => setBusinessTickets(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': firstClassTickets.trim() !== '',
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
                                        value={firstClassTickets}
                                        onChange={(e) => setFirstClassTickets(e.target.value)}
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
                                    visible={showAirfiledResults && arrivalCity.length > 0}
                                    render={(attrs) => (
                                        <div className={cx('search-start')} tabIndex="-1" {...attrs}>
                                            <PoperWrapper>
                                                <h3>Các sân bay</h3>
                                                <div className={cx('city-items-list')}>
                                                    {searchResults.map((airport) => (
                                                        <CityItems
                                                            key={airport.id}
                                                            data={airport}
                                                            onClick={() => handleSelect(airport, 'arrival')}
                                                        />
                                                    ))}
                                                </div>
                                            </PoperWrapper>
                                        </div>
                                    )}
                                >
                                    <input
                                        type="text"
                                        placeholder="Arrival City"
                                        value={arrivalCity}
                                        onFocus={() => setShowAirfiledResults(true)}
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
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                            />
                        </label>
                        <label className={cx('price-ticket')}>
                            <span> Giá vé</span>
                            <div className={cx('level-ticket')}>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': economyPrice.trim() !== '',
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
                                        value={economyPrice}
                                        onChange={(e) => setEconomyPrice(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': premiumEconomyPrice.trim() !== '',
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
                                        value={premiumEconomyPrice}
                                        onChange={(e) => setPremiumEconomyPrice(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': businessPrice.trim() !== '',
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
                                        value={businessPrice}
                                        onChange={(e) => setBusinessPrice(e.target.value)}
                                    />
                                </div>
                                <div className={cx('field')}>
                                    <label
                                        className={cx('field-label', {
                                            'show-field-label': firstClassPrice.trim() !== '',
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
                                        value={firstClassPrice}
                                        onChange={(e) => setFirstClassPrice(e.target.value)}
                                    />
                                </div>
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
