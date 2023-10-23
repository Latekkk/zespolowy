import React from 'react';
import { DateTime } from 'luxon';

function DateFormatter({ date, additionalText='', className = '' }) {
    const parsedDate = DateTime.fromISO(date);
    const formattedDate = parsedDate.toLocaleString(DateTime.DATE_FULL);
    return <div className={className}>{additionalText + ' ' + formattedDate}</div>;
}

export default DateFormatter;
