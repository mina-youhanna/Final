"use client"; // Make this a Client Component

import React, { useState } from 'react';
import LoginForm from '../components/login_form/login_form'; // Ensure correct casing for imports
import styled from 'styled-components';
const MainWrapper = styled.main`
    background-color: white;  // Set background color to light blue
    display: flex;
    flex-direction: column;
    align-items: center; // Center items horizontally
    justify-content: center; // Center items vertically if you want
    min-height: 100vh; // Ensure it covers the full height of the viewport
    padding: 20px; // Add some padding
`;
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccessMessage(data.message);
      // Handle successful login, e.g., redirect or store user info
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <MainWrapper>
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <LoginForm 
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        role={role}
        setRole={setRole}
        handleSubmit={handleSubmit}
      />
    </div>
    </MainWrapper>
  );
};

export default LoginPage;
