"use client"; // This enables the component to use client-side features
import React, { useState } from 'react';
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
`;

const Input = styled.input`
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const Select = styled.select`
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const MultipleSelect = styled.select`
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

export default function RegisterForm() {
    // State for form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',  // Student or Teacher
        grade: '',  // For students
        enrolledSubjects: [],  // For students
        category: '',  // For students (science, math, etc.)
        rating: 0,  // For teachers
        teacherSubject: '',  // For teachers
        channelLink: '',  // For teachers
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle enrolled subjects (multiple select)
    const handleSubjectsChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
        setFormData({
            ...formData,
            enrolledSubjects: selectedOptions,  // Update enrolled subjects
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send form data to the register API
            const response = await fetch('/routes/userRoutes.js/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User registered:', data);
                // Optionally, redirect or show a success message
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
            />
            <Input 
                type="email" 
                name="email" 
                placeholder="Enter your email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
            />
            <Input 
                type="password" 
                name="password" 
                placeholder="Enter your password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
            />
            <Select 
                name="role" 
                value={formData.role} 
                onChange={handleChange} 
                required 
            >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
            </Select>

            {/* Conditionally render fields for Students */}
            {formData.role === 'student' && (
                <>
                    <Input 
                        type="number" 
                        name="grade" 
                        placeholder="Enter your grade (1 to 6)" 
                        min="1"
                        max="6"
                        value={formData.grade} 
                        onChange={handleChange} 
                        required 
                    />
                    <MultipleSelect 
                        name="enrolledSubjects"  // Changed to enrolledSubjects
                        multiple 
                        value={formData.enrolledSubjects}  // Update to formData.enrolledSubjects
                        onChange={handleSubjectsChange} 
                    >
                        <option value="math">Math</option>
                        <option value="science">Science</option>
                        <option value="english">English</option>
                        <option value="history">History</option>
                        <option value="physics">Physics</option>
                    </MultipleSelect>
                    <Select 
                        name="category"  // Category for subjects (enum)
                        value={formData.category} 
                        onChange={handleChange} 
                        required 
                    >
                        <option value="">Select category</option>
                        <option value="Science">Science</option>
                        <option value="Math">Math</option>
                        <option value="English">English</option>
                        <option value="Physics">Physics</option>
                        <option value="Other">Other</option>
                    </Select>
                </>
            )}

            {/* Conditionally render fields for Teachers */}
            {formData.role === 'teacher' && (
                <>
                    <Input 
                        type="text" 
                        name="teacherSubject" 
                        placeholder="Enter your subject" 
                        value={formData.teacherSubject} 
                        onChange={handleChange} 
                        required 
                    />
                    <Input 
                        type="text" 
                        name="channelLink" 
                        placeholder="Enter your channel link" 
                        value={formData.channelLink} 
                        onChange={handleChange} 
                    />
                </>
            )}

            <Button type="submit">Register</Button>
        </Form>
    );
}
