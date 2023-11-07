import React, { ReactNode } from 'react';

type Heading3Props = {
    children: ReactNode;
    extraClass?: string;
};

const Heading1: React.FC<Heading3Props> = ({ children, extraClass = '' }) => {
    return (
        <h3 className={`text-xl font-bold uppercase mt-8 ${extraClass}`}>
            {children}
        </h3>
    );
};

export default Heading1;



