import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadImage() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert('Please select an image');
      return;
    }
    
    const formData = new FormData();
    formData.append('image', image);
    
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/api/predict/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      alert(`Analysis Result: ${response.data.result}`);
      navigate('/dashboard');
    } catch (error) {
      alert('Error uploading image');
    }
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl mb-4 text-center">Upload Medical Image</h2>
        <input
          type="file"
          accept="image/*"
          className="w-full mb-3"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Upload</button>
      </form>
    </div>
  );
}

export default UploadImage;