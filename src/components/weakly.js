import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Weakly() {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Project the graph components upon component load
        makeProj();
    }, []);

    const makeProj = async () => {
        try {
            // Replace with your graph projection endpoint
            await axios.get('http://localhost:4000/project-components-graph');
        } catch (error) {
            console.error('Error projecting components graph:', error);
        }
    };

    const getwcc = async () => {
        try {
            // Make an API call to fetch WCC data
            const response = await axios.get('http://localhost:4000/wcc-components');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching WCC data:', error);
        }
    };

    return (
        <div>
            <div className="jumbotron p-4" style={{ backgroundColor: 'powderblue' }}>
                <h1 className="display-4">Respective Component IDs for the Candidate Network</h1>
                <p className="lead">
                The presence of multiple candidates in a component could hint at informal alliances or factions. Even if not explicitly part of the same party, their participation may have been influenced by common goals or mutual endorsements.
                </p>
                <button className="btn btn-primary" onClick={getwcc}>
                    Get Candidate Components
                </button>
            </div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Candidate Name</th>
                        <th scope="col">Component ID</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.Candidate || 'Unknown'}</td>
                            <td>{item.ComponentId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Weakly;
