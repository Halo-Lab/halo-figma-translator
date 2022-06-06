import * as React from 'react';

const TransferIcon = ({style, width, height, color}) => {
    return (
        <svg
            className={style}
            width={width}
            height={height}
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 472.91 489.2"
        >
            <path
                d="M481,382.5a12.29,12.29,0,0,0-12.3-12.3H50l73.6-73.6a12.23,12.23,0,0,0-17.3-17.3l-94.5,94.5a12.19,12.19,0,0,0,0,17.3l94.5,94.5a12.27,12.27,0,1,0,17.4-17.3l-73.6-73.6h418.8A12.16,12.16,0,0,0,481,382.5Z"
                transform="translate(-8.14 0)"
            />
            <path
                d="M477.44,98,382.94,3.6a12.23,12.23,0,1,0-17.3,17.3l73.6,73.6H20.44a12.3,12.3,0,0,0,0,24.6h418.8l-73.6,73.4A12.27,12.27,0,0,0,383,209.8l94.5-94.5A12.28,12.28,0,0,0,477.44,98Z"
                transform="translate(-8.14 0)"
            />
        </svg>
    );
};

export default TransferIcon;
