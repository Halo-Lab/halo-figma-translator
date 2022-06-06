import * as React from 'react';

import Icons from '../Icons/Icons';

import styles from './Select.module.css';

const Select = ({data, onSelected}: {data: Array<{key: string; name: string}>; onSelected: Function}) => {
    const [value, setValue] = React.useState(data[0]);
    const [height, setHeight] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const rootEl = React.useRef(null);
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current) {
            setHeight(ref.current.scrollHeight);
        }

        const onClick = (e) => rootEl.current.contains(e.target) || setOpen(false);
        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    React.useEffect(() => {
        onSelected(value);
        setOpen(false);
    }, [value]);

    const Items = data.map((item, index) => {
        return (
            <div
                key={`select_option_${index}`}
                className={`${styles.item} ${item.key === value.key ? styles.item__Selected : ''}`}
                onClick={() => setValue(item)}
            >
                <span>{item.name}</span>
            </div>
        );
    });

    return (
        <div ref={rootEl} className={styles.wrap} onClick={() => setOpen(!open)}>
            <div className={styles.value}>
                <span>{value.name}</span>
                <Icons icon="arrow" />
            </div>

            <div ref={ref} className={styles.dropdown} style={{maxHeight: open ? height : 0}}>
                <div className={styles.items}>{Items}</div>
            </div>
        </div>
    );
};

export default Select;
