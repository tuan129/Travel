// Hook
import { useState, useEffect } from 'react';
// Styles
import styles from './AddAirfield.module.scss';
// Component
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
import { Wrapper as PoperWrapper } from '~/components/Poper';
// Library
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import axios from 'axios';

const cx = classNames.bind(styles);

function AddAirfield() {
    const navigate = useNavigate();
    const [airfieldName, setAirfieldName] = useState('');
    const [airfieldCode, setAirfieldCode] = useState('');
    const [country, setCountry] = useState('');

    const handleAddAirfield = async () => {
        try {
            if (!airfieldName || !airfieldCode || !country) {
                alert('Vui lòng điền đầy đủ thông tin sân bay.');
                return;
            }

            await axios.post('http://localhost:4000/api/airfield', {
                nameAirfield: airfieldName,
                codeAirfield: airfieldCode,
                country: country,
            });

            alert('Sân bay đã được thêm thành công!');
            navigate('/listairfield'); //Điều hướng đến danh sách sân bay
        } catch (err) {
            console.error('Error adding airfield:', err);
            alert('Thêm sân bay thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>ĐIỀN THÔNG TIN SÂN BAY</h1>
                <div className={cx('add-airfield')}>
                    <div className={cx('airfield-info')}>
                        <label>
                            <span>Sân bay</span>
                            <input
                                type="text"
                                placeholder="Nhập tên sân bay"
                                value={airfieldName}
                                onChange={(e) => setAirfieldName(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Mã sân bay</span>
                            <input
                                type="text"
                                placeholder="Nhập mã sân bay"
                                value={airfieldCode}
                                onChange={(e) => setAirfieldCode(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Thành phố</span>
                            <input
                                type="text"
                                placeholder="Nhập tên thành phố"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                        <label>
                            <span>Quốc gia</span>
                            <input
                                type="text"
                                placeholder="Nhập quốc gia của hãng"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </label>
                    </div>
                    <Button primary className={cx('btn-add-airfield')} onClick={handleAddAirfield}>
                        THÊM
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddAirfield;
