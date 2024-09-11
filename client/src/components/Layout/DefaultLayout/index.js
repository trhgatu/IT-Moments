import Header from '~/components/Layout/components/Header';
import Slider from './Slider';
import Footer from '~/components/Layout/components/Footer';

import styles from './DefaultLayout.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Slider />
                <div className={cx('content')}>
                    {children}
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default DefaultLayout;