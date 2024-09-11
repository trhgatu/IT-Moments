import classNames from "classnames/bind";
import styles from './Slider.module.scss'

const cx = classNames.bind(styles)



function Slider() {
    return <div className={cx('wrapper')}>
        <h3>Phần slider</h3>

    </div>
}

export default Slider;