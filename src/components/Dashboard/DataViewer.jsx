import React, { useState, useEffect } from 'react';
import { readData } from '../../services/api';

export default function DataViewer() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await readData();
      setData(response.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Saved Data</h2>
        <button 
          onClick={fetchData}
          className="btn btn-outline"
          disabled={loading}
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      {data.length === 0 && !loading ? (
        <div className="py-8 text-center text-gray-500">
          <p>No data saved yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="text-sm text-gray-500 mb-2">
                {new Date(item.timestamp).toLocaleString()}
              </div>
              <pre className="bg-gray-50 p-3 rounded overflow-x-auto">
                {JSON.stringify(item.content, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}