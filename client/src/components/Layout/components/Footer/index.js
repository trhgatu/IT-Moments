import classNames from "classnames/bind";
import styles from './Footer.module.scss';


const cx = classNames.bind(styles);


function Footer() {
    return <footer className={cx('wrapper')}>
        <div className={cx('inner')}>
            <h2>Footer</h2>
        </div>

    </footer>
}

export default Footer;