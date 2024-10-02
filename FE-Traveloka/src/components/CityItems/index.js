import React from 'react';
import classNames from 'classnames/bind';
import styles from './CityItems.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function CityItems({ data, onClick }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <div className={cx('info')}>
                <FontAwesomeIcon className={cx('icon')} icon={faPlane} />
                <div className={cx('info-airfield')}>
                    <div className={cx('name-airfield')}>
                        {/* tên sân bay */}
                        <p>{data.name}</p>
                        {/* mã sân bay */}
                        <span className={cx('code-airfield')}>{data.code}</span>
                    </div>
                    <p className={cx('name-country')}>
                        {data.city}, {data.country}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CityItems;
