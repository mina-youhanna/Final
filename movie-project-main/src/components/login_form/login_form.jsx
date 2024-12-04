"use client"; // Add this line to make it a Client Component

import React from 'react';
import styled from 'styled-components';

// Styled components for the form
const Form = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); // Add shadow on focus
    }
`;

const Button = styled.button`
    padding: 12px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const Select = styled.select`
    margin: 10px 0;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    transition: border-color 0.3s, box-shadow 0.3s;

    &:focus {
        border-color: #007bff;
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); // Add shadow on focus
    }
`;

const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
`;

const LoginForm = ({ email, setEmail, password, setPassword, role, setRole, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="email">Email:</Label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="role">Role:</Label>
        <Select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </Select>
      </div>
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginForm;
