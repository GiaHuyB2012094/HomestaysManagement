import classNames from 'classnames/bind';
import styles from './button.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Button({
    to,
    href,
    primary = false,
    small = false,
    disable = false,
    large = false,
    round = false,
    clear = false,
    feature = false,
    fab = false,
    children,
    className,
    leftIcon,
    RightIcon,
    onClick,
    ...passProps
}) {
    let Component = 'button';
    const props = {
        onClick,
        ...passProps, //để đưa những cái props khác nữa vào button
    };

    // delete event listener when btn is disable
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') delete props[key];
        });
    }

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className, // để sau này tự custom class cho nó
        primary,
        small,
        large,
        disable,
        round,
        clear,
        feature,
        fab,
    });
    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {RightIcon && <span className={cx('icon')}>{RightIcon}</span>}
        </Component>
    );
}

export default Button;
