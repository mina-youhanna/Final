// File: app/Components/NavigationBar.jsx
import React from 'react';
import styled from 'styled-components';

const Nav = styled.nav`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 10px;
    background-color: #007bff;
`;

const NavLink = styled.a`
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const Title = styled.h1`
    color: white;
    margin: 0;
`;


const NavigationBar = () => {
    // If you are using react-router-dom
    // const history = useHistory();

    return (
        <Nav>
            <Title>BrightMind</Title>
            <div>
                <NavLink href="/">Home</NavLink>
                <NavLink href="/register">Sign Up</NavLink>
                <NavLink href="/login">Log In</NavLink>
            </div>
        </Nav>
    );
};

export default NavigationBar;
