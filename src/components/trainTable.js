import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../style/table.css';
import { sortTrains } from '../utils/trainUtils'; // Import sorting utility function

function TrainTable({ trains }) {
    const [sortConfig, setSortConfig] = useState({ key: 'trainID', direction: 'asc' });
    const navigate = useNavigate(); // Initialize useNavigate

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getSortArrow = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? '▲' : '▼';
        }
        return '';
    };

    const sortedTrains = sortTrains(trains, sortConfig.key, sortConfig.direction);

    const handleRowClick = (trainCode) => {
        navigate(`/train/${trainCode}`); // Navigate to the train details page
    };

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
                        <tr
                            key={index}
                            onClick={() => handleRowClick(train.trainCode)}
                            style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
                        >
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
