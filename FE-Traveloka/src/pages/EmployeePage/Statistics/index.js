import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Statistics.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const monthNames = [
    'Tháng 1 ',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
];

function Statistics() {
    const [monthlyRevenue, setMonthlyRevenue] = useState(Array(12).fill(0));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .post('http://localhost:3001/api/revenue')
            .then((response) => {
                const groupedRevenue = groupRevenueByMonth(response.data);
                setMonthlyRevenue(groupedRevenue);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching revenue data:', error);
                setIsLoading(false);
            });
    }, []);

    const groupRevenueByMonth = (data) => {
        const revenueMap = Array(12).fill(0);

        data.forEach((item) => {
            const date = item.date; // Assuming the date field is named 'date'
            const revenue = item.revenue; // Assuming the revenue field is named 'revenue'
            const month = parseInt(date.slice(0, 2), 10) - 1; // Extract month from 'mmddyyyy' and convert to 0-based index

            revenueMap[month] += revenue;
        });

        return revenueMap;
    };

    const getMaxRevenue = () => {
        return Math.max(...monthlyRevenue);
    };

    const maxRevenue = getMaxRevenue();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <h1>Doanh Thu</h1>
                <div className={cx('chart-layout')}>
                    {isLoading
                        ? monthNames.map((month, index) => (
                              <div key={index} className={cx('chart-layout__item')} style={{ height: '10%' }}>
                                  <div className={cx('revenue')}>10%</div>
                                  <div className={cx('month')}>{month}</div>
                              </div>
                          ))
                        : monthlyRevenue.map((revenue, index) => (
                              <div
                                  key={index}
                                  className={cx('chart-layout__item')}
                                  style={{ height: `${(revenue / maxRevenue) * 100}%` }}
                              >
                                  <div className={cx('revenue')}>{revenue} VNĐ</div>
                                  <div className={cx('month')}>{monthNames[index]}</div>
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}

export default Statistics;
