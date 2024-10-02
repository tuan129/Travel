import Button from '~/components/Button';

import classNames from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = classNames.bind(styles);

function MenuItems({ data }) {
    return (
        <Button onClick={data.onClick} className={cx('menu-item')}>
            {data.title}
        </Button>
    );
}

export default MenuItems;
