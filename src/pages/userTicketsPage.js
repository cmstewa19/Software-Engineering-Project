import Header from '../components/header.js'; // header

function UserTickets() {

    const table = 

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
            <table id='ticket-table' style={styles.TicketTable}>
                <tr style={styles.TableHeader}>
                    <th>Ticket ID</th>
                    <th>Origin</th>
                    <th>Destination</th>
                    <th>Departure Time</th>
                    <th>Quantity</th>
                </tr>
                <tr style={styles.TableHeader}>
                    <td>Col 1</td>
                    <td>Col 2</td>
                    <td>Col 3</td>
                    <td>Col 4</td>
                    <td>Col 5</td>
                </tr>
                <a href='/myTickets' style={styles.TableRow}>
                    <tr style={styles.TableHeader}>
                        <td style={styles.TableData}>001</td>
                        <td>Sioux Falls</td>
                        <td>Brookings</td>
                        <td>12:00 p.m.</td>
                        <td>x3</td>
                    </tr>
                </a>
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
        border:'1px solid black'
    },
    TableRow: {
        border:'1px solid black',
        textDecoration:'none',
        color:'black', 
        backgroundColor:'grey'
    },
    TableData: {

    }
};

export default UserTickets;