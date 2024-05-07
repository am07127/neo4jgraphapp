import React, { useState, useEffect } from 'react';

function CandidatePredictions() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await fetch('http://localhost:4000/candidate-predictions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPredictions(data);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      }
    };

    fetchPredictions();
  }, []);

  return (
    <div>
            <div className="jumbotron p-4" style={{backgroundColor:'powderblue'}}>
                <h1 className="display-4">Explore our State of the Art Candidate Contestion Model</h1>
                <p className="lead">This table shows the potential of two candidates participating together on the basis of their individual experiences and past electoral history</p>
            </div>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">First Candidate</th>
                        <th scope="col">Second Candidate</th>
                        <th scope="col">Probability</th>
                    </tr>
                </thead>
                <tbody>
                    {predictions.map((item, index) => (
                        <tr key={index}>
                            <td>{item.candidate1}</td>
                            <td>{item.candidate2}</td>
                            <td>{item.probability}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
  );
}

export default CandidatePredictions;
