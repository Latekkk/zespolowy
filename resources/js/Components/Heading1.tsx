import React, { ReactNode } from 'react';

type Heading1Props = {
    children: ReactNode;
    extraClass?: string;
};

const Heading1: React.FC<Heading1Props> = ({ children, extraClass = '' }) => {
    return (
        <h1 className={`text-4xl font-bold text-blue-500 uppercase text-center mt-8 ${extraClass}`}>
            {children}
        </h1>
    );
};

export default Heading1;



