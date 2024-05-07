import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CandidateSeats() {
    const [data, setData] = useState([]);
    const [isprojected, setIsProjected] = useState(false);

    useEffect(() => {
        if (isprojected) {
            axios.post('http://localhost:4000/dropprojection', { projection: 'candidateElectionGraph' })
                .then(response => {
                    console.log(response.data);
                    setIsProjected(false);
                })
                .catch(error => {
                    console.error('Error dropping projection', error);
                });
        }
        axios.get('http://localhost:4000/candidates').then(respnse => {
            setData(respnse.data);
            setIsProjected(true);
        
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div>
            <div className="jumbotron p-4" style={{backgroundColor:'powderblue'}}>
                <h1 className="display-4">Candidate Seats</h1>
                <p className="lead">This table shows the number of seats each candidate has contested for during their respective political careers.</p>
            </div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Candidate Name</th>
                        <th scope="col">Seats Contested</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CandidateSeats;
