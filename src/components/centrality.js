import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CandidateInfluence() {
    const [data, setData] = useState([]);

    const dropProjection = async () => {
        axios.post('http://localhost:4000/dropprojection', { projection: 'betweenGraph' })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error dropping projection', error);
                });
    }

    useEffect(() => {
        dropProjection();
    }
    , []);

    const getCentrality = async () => {
        try {
            const response = await axios.get('http://localhost:4000/betweenness');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div>
            <div className="jumbotron p-4" style={{backgroundColor:'powderblue'}}>
                <h1 className="display-4">Candidate Influence</h1>
                <p className="lead">This table shows candidates with a great influence in the network of US politicians on the basis of betweenness centrality.</p>
                <button className="btn btn-primary" onClick={getCentrality}>Get Centrality</button>
            </div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Candidate Name</th>
                        <th scope="col">Betweenness Score</th>
                    </tr>
                </thead>
                <tbody>
                    {data.filter(item => item.name !== 'NA').map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.score.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CandidateInfluence;
