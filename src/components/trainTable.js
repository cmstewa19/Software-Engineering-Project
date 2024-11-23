import React, { useState } from 'react';
import '../style/table.css';
import { sortTrains } from '../utils/trainUtils'; // import sorting utility function

function TrainTable({ trains }) {
    const [sortConfig, setSortConfig] = useState({ key: 'trainID', direction: 'asc' });

    // Function to handle sorting when a column header is clicked
    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // Function to render the sorting arrow (up or down) next to the column header
    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return '';
    };

    // Use the utility function for sorting
    const sortedTrains = sortTrains(trains, sortConfig.key, sortConfig.direction);

    return (
        <div style={{ overflowX: 'auto' }}>
        <table className="custom-table">
            <thead>
            <tr>
                <th onClick={() => requestSort('trainID')}>
                Train ID/Code {getSortArrow('trainID')}
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
                <th onClick={() => requestSort('availableSeats')}>
                Available Seats {getSortArrow('availableSeats')}
                </th>
                <th onClick={() => requestSort('price')}>
                Price {getSortArrow('price')}
                </th>
            </tr>
            </thead>
            <tbody>
            {sortedTrains.map((train, index) => (
                <tr key={index}>
                <td>{train.trainCode}</td>
                <td>{train.origin}</td>
                <td>{train.destination}</td>
                <td>{train.departureTime}</td>
                <td>{train.arrivalTime}</td>
                <td>{train.availableSeats}</td>
                <td>{train.price}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
}

export default TrainTable;
