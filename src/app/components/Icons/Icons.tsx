import * as React from 'react';

import ArrowIcon from './components/ArrowIcon';
import TransferIcon from './components/TransferIcon';

const Icons = (props: any) => {
    const {icon, ...data} = props;

    const ICONS = {
        arrow: <ArrowIcon {...data} />,
        transfer: <TransferIcon {...data} />,
    };

    return ICONS[icon];
};

export default Icons;
