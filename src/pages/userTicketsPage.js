import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import TicketTable from '../components/userTicketTable';

function UserTickets() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/my-tickets', { credentials: 'include' });
                if (!response.ok) throw new Error('Failed to fetch tickets');
                const data = await response.json();
                setTickets(data);
                console.log("data: ", data)
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    return (
        <div id="user-tickets-page">
            <Header />
            <Sidebar />
            <h1>User Tickets</h1>
            {loading ? <p>Loading tickets...</p> : <TicketTable tickets={tickets} />}
        </div>
    );
}

export default UserTickets;
