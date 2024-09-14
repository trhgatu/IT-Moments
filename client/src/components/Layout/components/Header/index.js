import { useState, useEffect, useRef } from 'react';
import { CgProfile } from "react-icons/cg";
import { IoIosNotifications } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Header() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showSearch, setShowSearch] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Trạng thái để kiểm tra cuộn

    const searchRef = useRef(null);

    const handleClickOutside = (event) => {
        if(searchRef.current && !searchRef.current.contains(event.target)) {
            setShowSearch(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Thêm sự kiện cuộn
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true); // Khi cuộn qua 50px
            } else {
                setIsScrolled(false); // Khi về đầu trang
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearchClick = () => {
        setShowSearch(prev => !prev);
    };

    const handleClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <header className={cx('wrapper', { scrolled: isScrolled })}> {/* Thêm class 'scrolled' */}
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <a href="#">
                        <h2 className={cx('logo_text')}>IT Moments</h2>
                    </a>
                </div>
                <div className={cx('navbar')}>
                    <ul className={cx('list')}>
                        {['Trang chủ', 'Sự kiện', 'Hoạt động', 'Học thuật', 'Giới thiệu', 'Liên hệ'].map((item, index) => (
                            <li key={index} className={cx('item')}>
                                <a
                                    href="#"
                                    className={cx('link', { active: activeIndex === index })}
                                    onClick={() => handleClick(index)}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className={cx('actions-wrapper')}>
                        <div className={cx('actions')} ref={searchRef}>
                            <button className={cx('search')} onClick={handleSearchClick}>
                                <IoSearch />
                            </button>
                            <button className={cx('noti')}>
                                <IoIosNotifications />
                            </button>
                            <button className={cx('profile')}>
                                <CgProfile />
                            </button>
                        </div>
                        <div className={cx('search-container', { show: showSearch })}>
                            <input type="text" className={cx('search-input')} placeholder="Tìm kiếm..." />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
