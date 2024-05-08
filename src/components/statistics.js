import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = () => {
  const [nodeCount, setNodeCount] = useState([]);
  const [totalNodes, setTotalNodes] = useState(null);
  const [totalRelationships, setTotalRelationships] = useState(null);
  const [isolatedNodes, setIsolatedNodes] = useState(null);
  const [error, setError] = useState(null);

  // Fetch node count by type
  const fetchNodeCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/node-count');
      setNodeCount(response.data);
    } catch (err) {
      console.error('Error fetching node count:', err);
      setError('Error fetching node count');
    }
  };

  // Fetch the total number of nodes
  const fetchTotalNodes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/total-nodes');
      setTotalNodes(response.data.totalNodes);
    } catch (err) {
      console.error('Error fetching total nodes:', err);
      setError('Error fetching total nodes');
    }
  };

  // Fetch the total number of relationships
  const fetchTotalRelationships = async () => {
    try {
      const response = await axios.get('http://localhost:4000/total-relationships');
      setTotalRelationships(response.data.totalRelationships);
    } catch (err) {
      console.error('Error fetching total relationships:', err);
      setError('Error fetching total relationships');
    }
  };

  // Fetch the total number of isolated nodes
  const fetchIsolatedNodes = async () => {
    try {
      const response = await axios.get('http://localhost:4000/isolated-nodes');
      setIsolatedNodes(response.data.isolatedNodes);
    } catch (err) {
      console.error('Error fetching isolated nodes:', err);
      setError('Error fetching isolated nodes');
    }
  };

  // Fetch all data once the component mounts
  useEffect(() => {
    fetchNodeCount();
    fetchTotalNodes();
    fetchTotalRelationships();
    fetchIsolatedNodes();
  }, []);

  return (
    <div className="container">
      <div className='container p-4'>
      <h1>Graph Statistics</h1>
      </div>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Statistic</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {nodeCount.map((node, index) => (
              <tr key={index}>
                <td>{`Nodes (${node.NodeType.join(', ')})`}</td>
                <td>{node.TotalCount}</td>
              </tr>
            ))}
            <tr>
              <td>Total Nodes</td>
              <td>{totalNodes}</td>
            </tr>
            <tr>
              <td>Total Relationships</td>
              <td>{totalRelationships}</td>
            </tr>
            <tr>
              <td>Isolated Nodes</td>
              <td>{isolatedNodes}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
