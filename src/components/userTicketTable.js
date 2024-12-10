import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/table.css';
import { sortTickets } from '../utils/ticketUtils'; // Utility function for sorting

function TicketTable({ tickets }) {
    const [sortConfig, setSortConfig] = useState({ key: 'ticketID', direction: 'asc' });
    const navigate = useNavigate();

    // Sorting function
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Get sorting arrow for the table headers
    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return '';
    };

    // Sort tickets based on the current sort configuration
    const sortedTickets = sortTickets(tickets, sortConfig.key, sortConfig.direction);

    // Handle row click to navigate to TicketInfoPage with ticket data
    const handleRowClick = (ticket) => {
        navigate('/myTickets', { state: { ticket } });
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('ticketID')}>
                            Ticket ID {getSortArrow('ticketID')}
                        </th>
                        <th onClick={() => requestSort('origin')}>
                            Origin {getSortArrow('origin')}
                        </th>
                        <th onClick={() => requestSort('destination')}>
                            Destination {getSortArrow('destination')}
                        </th>
                        <th onClick={() => requestSort('departureTime')}>
                            Departure Time {getSortArrow('departureTime')}
                        </th>
                        <th onClick={() => requestSort('arrivalTime')}>
                            Arrival Time {getSortArrow('arrivalTime')}
                        </th>
                        <th onClick={() => requestSort('price')}>
                            Price {getSortArrow('price')}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTickets.map((ticket, index) => (
                        <tr
                            key={index}
                            onClick={() => handleRowClick(ticket)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>{ticket.ticket_id}</td>
                            <td>{ticket.origin}</td>
                            <td>{ticket.destination}</td>
                            <td>{ticket.departure_time}</td>
                            <td>{ticket.arrival_time}</td>
                            <td>{ticket.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TicketTable;
