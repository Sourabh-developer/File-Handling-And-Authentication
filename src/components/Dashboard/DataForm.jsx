import React, { useState } from 'react';
import { saveData } from '../../services/api';

export default function DataForm({ onSave }) {
  const [jsonData, setJsonData] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const parsedData = JSON.parse(jsonData);
      await saveData(parsedData);
      setSuccess('Data saved successfully!');
      setJsonData('');
      if (onSave) onSave();
    } catch (err) {
      setError('Invalid JSON format or save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card mb-6">
      <h2 className="text-xl font-bold mb-4">Save JSON Data</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">JSON Data</label>
          <textarea
            className="form-control"
            rows="6"
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            placeholder='{"key": "value"}'
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Data'}
        </button>
        
        {error && <div className="mt-4 alert alert-error">{error}</div>}
        {success && <div className="mt-4 alert alert-success">{success}</div>}
      </form>
    </div>
  );
}