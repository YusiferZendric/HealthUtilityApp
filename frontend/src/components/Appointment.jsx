import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      try {
        // Assuming there's an endpoint to get doctors
        const response = await axios.get('http://localhost:5000/api/auth/doctors', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDoctors(response.data.doctors);
      } catch (error) {
        alert('Error fetching doctors');
      }
    };
    fetchDoctors();
  }, [navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/appointment/schedule', {
        doctor_id: doctorId,
        appointment_time: appointmentTime
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Appointment scheduled');
      navigate('/dashboard');
    } catch (error) {
      alert('Error scheduling appointment');
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-center">Schedule Appointment</h2>
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor.id} value={doctor.id}>{doctor.username}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          className="w-full mb-3 p-2 border rounded"
          value={appointmentTime}
          onChange={(e) => setAppointmentTime(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Schedule</button>
      </form>
    </div>
  );
}

export default Appointment;