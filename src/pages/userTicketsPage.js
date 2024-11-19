import Header from '../components/header.js'; // header
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js'; // sidebar

function UserTickets() {

    const navigate = useNavigate();

    {/* Eventually a funtion to add a row to the table */}
    function addRows() {
        const tablebody = document.getElementById('ticket-table');
        const row = document.createElement('tr');
        for(let i = 1; i <=5; i++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text"; // Allow text input
            input.placeholder = `Enter value for column ${i}`;
            cell.appendChild(input);
            row.appendChild(cell);
        }
        tablebody.appendChild(row);
    }

    return (
        <div>
            <Header />
            <Sidebar />
            {/* table to store all of user's tickets */}
            <table id='ticket-table' border="1" cellPadding="10" style={{ width: '90%', margin: '50px', borderCollapse: 'collapse' }}>
            <thead>
                {/* header row */}
                <tr>
                    <th>Ticket ID</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Departure Time</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                {/* static entry to figure out formatting. Once database 
                is set up I can make a function to dynamically create a table */}
                <tr onClick={() => navigate('/myTickets')} style={{cursor:'pointer'}}>
                    <td>0001</td>
                    <td>Sioux Falls</td>
                    <td>Rapid City</td>
                    <td>1/1/2024 10:00A</td>
                    <td>x2</td>
                </tr>
            </tbody>
            </table>
        </div>
    );
};

export default UserTickets;