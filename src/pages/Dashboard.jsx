import React from 'react';
import DataForm from '../components/Dashboard/DataForm';
import DataViewer from '../components/Dashboard/DataViewer';
import { useState } from 'react';

export default function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);
  
  const handleSaveSuccess = () => {
    setRefreshKey(prev => prev + 1);
  };
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Manage your JSON data securely</p>
      </div>
      
      <DataForm onSave={handleSaveSuccess} />
      <DataViewer key={refreshKey} />
    </div>
  );
}