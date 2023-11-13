import { useState } from 'react';
import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Image.module.scss';
const Image = forwardRef(({ src, alt, srcSet, className, ...props }, ref) => {
    const [fallBack, setFallBack] = useState(''); //Kt xem src đã có hay chưa hoặc bị lỗi
    const urlAvatarDefault =
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpcLzYU8SsybUPTpqpI01wbVK1Ysqi5FU98w&usqp=CAU';
    const handleError = () => {
        setFallBack(urlAvatarDefault);
    };


    return (
            <img
                ref={ref}
                className={classNames(styles.wrapper, className)}
                src={fallBack || src}
                srcSet={srcSet}
                alt={alt}
                {...props}
                onError={handleError}
            />
        
    );
});

export default Image;
