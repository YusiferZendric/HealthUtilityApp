import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRecords = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/patient/record', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecords(response.data.records);
      } catch (error) {
        alert('Error fetching records');
      }
    };
    fetchRecords();
  }, [navigate]);
  
  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Dashboard</h1>
      <div className="mb-4">
        <button
          onClick={() => navigate('/appointment')}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Schedule Appointment
        </button>
        <button
          onClick={() => navigate('/upload-image')}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Upload Medical Image
        </button>
      </div>
      <h2 className="text-2xl mb-2">Health Records</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2">Blood Pressure</th>
            <th className="py-2">Cholesterol</th>
            <th className="py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <tr key={record.id} className="text-center">
              <td className="py-2">{record.blood_pressure}</td>
              <td className="py-2">{record.cholesterol}</td>
              <td className="py-2">{new Date(record.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;