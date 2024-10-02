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
                    <div className={cx('name-airline')}>
                        <p>{data.nameAirline}</p>
                        <span className={cx('code-airline')}>{data.code}</span>
                    </div>
                    <p className={cx('short-name')}>{data.name}</p>
                </div>
            </div>
        </div>
    );
}

export default AirlineItems;
