import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/table.css';
import { sortTrains } from '../utils/trainUtils';

function TrainTable({ trains }) {
    const [sortConfig, setSortConfig] = useState({ key: 'trainID', direction: 'asc' });
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

    // Sort trains based on the current sort configuration
    const sortedTrains = sortTrains(trains, sortConfig.key, sortConfig.direction);

    // Handle row click to navigate to TrainInfoPage with train data
    const handleRowClick = (train) => {
        navigate('/train-info', { state: { train } });
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th onClick={() => requestSort('trainCode')}>
                            Train ID/Code {getSortArrow('trainCode')}
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
                            onClick={() => handleRowClick(train)}
                            style={{ cursor: 'pointer' }}
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
