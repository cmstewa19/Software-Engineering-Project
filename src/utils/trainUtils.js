// helper functions for browseTrainsPage.js
import { parseISO, format } from 'date-fns';

// Function to format a date into a readable string (MM/DD/YYYY HH:mm AM/PM)
export const formatDate = (dateStr) => {
    if (!dateStr) {
        console.error('Invalid date string:', dateStr);
        return 'Invalid date';
    }

    try {
        const date = parseISO(dateStr);
        return format(date, 'MM/dd/yyyy hh:mm a');
    } catch (error) {
        console.error('Error parsing date:', dateStr);
        return 'Invalid date';
    }
};
  
// Function for table sorting 
export const sortTrains = (trains, key, direction) => {
    const sorted = [...trains].sort((a, b) => {
    const dir = direction === 'asc' ? 1 : -1;

    if (key === 'departureTime' || key === 'arrivalTime') {
        return dir * (new Date(a[key]) - new Date(b[key]));
    }

    if (typeof a[key] === 'string') {
        return dir * a[key].localeCompare(b[key]);
    }

    if (typeof a[key] === 'number') {
        return dir * (a[key] - b[key]);
    }

    return 0;
    });

    return sorted;
};
