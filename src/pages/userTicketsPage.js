import Header from '../components/header.js'; // header
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar.js'; // sidebar

function UserTickets() {

    const navigate = useNavigate();

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
            <table id='ticket-table' border="1" cellPadding="10" style={{ width: '90%', margin: '50px', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={styles.TableHeader}>
                    <th>Ticket ID</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Departure Time</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
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

const styles = {
    TicketTable: {
        width: '90%',
        margin:'50px',
        border:'1px solid black'
    },
    TableHeader: {
        
    },
    TableRow: {
        textDecoration:'none',
        color:'black'
    },
    TableData: {

    }
};

export default UserTickets;