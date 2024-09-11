import styles from './Header.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles)


function Header(){
    return <header className={cx('wrapper')}>
        <div className={cx('inner')}>
            <div className={cx('logo')}>
                <h2 className={cx('logo_text')}>
                    IT Moments
                </h2>
            </div>
            <div className = {cx('navbar')}>
                <ul className={cx('list')}>
                    <li className={cx('item')}>
                        <a className={cx('link')} href='#'>Trang chủ</a>
                    </li>
                    <li className={cx('item')}><a className={cx('link')} href='#'>Sự kiện</a></li>
                    <li className={cx('item')}><a className={cx('link')} href='#'>Hoạt động</a></li>
                    <li className={cx('item')}><a className={cx('link')} href='#'>Học thuật</a></li>
                    <li className={cx('item')}><a className={cx('link')} href='#'>Giới thiệu</a></li>
                </ul>

                <ul className={cx('action')}>


                </ul>

            </div>
        </div>
    </header>
}

export default Header