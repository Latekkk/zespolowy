import React from 'react';

const Errors = ({ errors }) => {
    if (!errors || errors.length === 0) {
        return null;
    }

    return (
        <ul>
            {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                ))}
        </ul>
    );
};

export default Errors;
