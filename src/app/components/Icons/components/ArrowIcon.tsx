import * as React from 'react';

const ArrowIcon = ({style, width, height, color}) => {
    return (
        <svg
            className={style}
            width={width}
            height={height}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 8.59 4.79"
        >
            <path
                d="M8.21,10a.5.5,0,0,0-.36.85l3.8,3.8a.5.5,0,0,0,.7,0l3.8-3.8a.5.5,0,0,0-.36-.85Z"
                transform="translate(-7.71 -10)"
            />
        </svg>
    );
};

export default ArrowIcon;
