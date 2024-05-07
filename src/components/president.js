import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PresidentialVotes() {
    const [data, setData] = useState([]);
    const [electionType, setElectionType] = useState('PRESIDENT')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:4000/run-cypher', { type: electionType });
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [electionType]);

    return (
        <div>
            <div className="jumbotron p-4" style={{backgroundColor:'powderblue'}}>
                {electionType === 'PRESIDENT' ? <h1 className="display-4">Presidential Votes</h1> : <h1 className="display-4">Senate Votes</h1>}
                <p className="lead">This table shows the number of votes each party received in the concerned election type.</p>
                <div className="btn-group" role="group" aria-label="Election Type">
                    <button type="button" className="btn btn-secondary mx-2" onClick={() => setElectionType('PRESIDENT')}>Presidential</button>
                    <button type="button" className="btn btn-secondary mx-2" onClick={() => setElectionType('SENATE')}>Senate</button>
                </div>
            </div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Year</th>
                        <th scope="col">Party</th>
                        <th scope="col">Votes</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.year}</td>
                            <td>{item.party}</td>
                            <td>{item.candidate_votes.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PresidentialVotes;
