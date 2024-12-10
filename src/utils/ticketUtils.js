export const sortTickets = (tickets, key, direction) => {
    const sortedTickets = [...tickets].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    });
    return sortedTickets;
};
