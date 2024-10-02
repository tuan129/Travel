import styles from './Menu.module.scss';
import classNames from 'classnames/bind';

import Tippy from '@tippyjs/react/headless';
import { Wrapper as PoperWrapper } from '~/components/Poper';
import MenuItems from './MenuItems';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItems key={index} data={item} />);
    };

    return (
        <Tippy
            trigger="click"
            placement="bottom"
            interactive
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PoperWrapper>
                        <div className={cx('menu-poper')}>{renderItems()}</div>
                    </PoperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
