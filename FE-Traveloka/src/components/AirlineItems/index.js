import React from 'react';
import classNames from 'classnames/bind';
import styles from './AirlineItems.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function AirlineItems({ data, onClick }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <div className={cx('info')}>
                <FontAwesomeIcon className={cx('icon')} icon={faPlane} />
                <div className={cx('info-airline')}>
                    <p>{data.nameAirline}</p>
                </div>
            </div>
        </div>
    );
}

export default AirlineItems;
