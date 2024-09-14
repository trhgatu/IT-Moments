// DefaultLayout.js
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
import Slider from '~/components/Layout/components/Slider';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Slider />
                <div className={cx('content')}>
                    {children}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    );
}

export default DefaultLayout;
