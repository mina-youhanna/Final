'use client'
import React from 'react'
import styled from 'styled-components'
import SignupForm from '../Components/Forms/signupForm'
import Nav from '../Components/NavBar/Nav'


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
     color: #333;
`;
const page = () => {
  return (
    <>
          <Nav/>
          <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
          <SignupForm/>
    </>
  )
}

export default page
