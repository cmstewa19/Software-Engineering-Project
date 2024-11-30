import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/table.css';
import { sortTrains } from '../utils/trainUtils';

function TrainTable({ trains }) {
    const [sortConfig, setSortConfig] = useState({ key: 'trainID', direction: 'asc' });
    const [filteredTrains, setFilteredTrains] = useState(trains); // Filtered trains state
    const navigate = useNavigate();

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

    const handleSearch = (from, to) => {
        // Filter trains based on search criteria
        const result = trains.filter((train) => {
            const matchesFrom = !from || train.origin === from;
            const matchesTo = !to || train.destination === to;
            return matchesFrom && matchesTo;
        });
        setFilteredTrains(result);
    };

    const sortedTrains = sortTrains(filteredTrains, sortConfig.key, sortConfig.direction);

    // Get unique origins and destinations
    const uniqueOrigins = Array.from(new Set(trains.map((train) => train.origin)));
    const uniqueDestinations = Array.from(new Set(trains.map((train) => train.destination)));

    return (
        <>

            {/* Train Table */}
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
                                onClick={() => navigate(`/train/${train.trainCode}`)}
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
        </>
    );
}

export default TrainTable;
