// Hook
import { useState, useEffect } from 'react';
// Styles
import styles from './Airline.module.scss';
// Component
import Button from '~/components/Button';
import { useNavigate } from 'react-router-dom';
// Library
import classNames from 'classnames/bind';
import axios from 'axios';

const cx = classNames.bind(styles);

function AddAirline() {
    const navigate = useNavigate();
    const [airlineName, setAirlineName] = useState('');

    const handleAddAirline = async () => {
        try {
            if (!airlineName) {
                alert('Vui lòng điền đầy đủ thông tin hãng hàng không.');
                return;
            }

            await axios.post('http://localhost:4000/api/airline', {
                nameAirline: airlineName,
            });

            alert('Hãng hàng không đã được thêm thành công!');
            navigate('/listairline'); //Điều hướng đến danh sách hãng hàng không
        } catch (err) {
            console.error('Error adding airline:', err);
            alert('Thêm hãng hàng không thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>ĐIỀN THÔNG TIN HÃNG</h1>
                <div className={cx('add-airline')}>
                    <div className={cx('airline-info')}>
                        <label>
                            <span>Tên Hãng hàng không</span>
                            <input
                                type="text"
                                placeholder="Nhập tên hãng hàng không"
                                value={airlineName}
                                onChange={(e) => setAirlineName(e.target.value)}
                            />
                        </label>
                    </div>
                    <Button primary className={cx('btn-add-airline')} onClick={handleAddAirline}>
                        THÊM
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AddAirline;
