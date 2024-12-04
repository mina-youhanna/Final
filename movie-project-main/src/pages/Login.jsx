import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-image: url('https://images.pexels.com/photos/8500417/pexels-photo-8500417.jpeg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 20px;
  color: #333;
  margin-top: 100px;
  width: 100%;
`;

const Wrapper = styled.div`
  width: 420px;
  background: transparent;
  border: 2px solid rgba(255,255,255,.2);
  box-shadow: 0 0 10px rgba(0,0,0,.2);
  backdrop-filter: blur(30px);
  color: #fff;
  border-radius: 10px;
  padding: 30px 40px;
  margin-top: 100px; 
`;

const Title = styled.h1`
  font-size: 36px;
  text-align: center;
`;

const InputBox = styled.div`
  position: relative;
  width: 100%;
  height: 50px;
  margin: 30px 0;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  background: transparent;
  border: 2px solid rgba(255,255,255,.2);
  outline: none;
  border-radius: 40px;
  font-size: 16px;
  color: #fff;
  padding: 20px 45px 20px 20px;

  &::placeholder {
    color: #fff;
  }
`;

const RememberForgot = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14.5px;
  margin: -15px 0 15px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;

  input {
    accent-color: #fff;
    margin-right: 4px;
  }
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  background: #fff;
  border: none;
  outline: none;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0,0,0,.1);
  cursor: pointer;
  font-size: 16px;
  color: #333;
  font-weight: 700;
`;

const RegisterLink = styled.div`
  font-size: 14.5px;
  text-align: center;
  margin: 20px 0 15px;

  p a {
    color: #fff;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginForm = () => {
  return (
    <Container>
      <Wrapper>
        <form action="">
          <Title>Login</Title>
          <InputBox>
            <Input type="text" placeholder='Username' required />
          </InputBox>
          <InputBox>
            <Input type="password" placeholder='Password' required />
          </InputBox>
          <RememberForgot>
            <CheckboxLabel>
              <input type="checkbox" />Remember me
            </CheckboxLabel>
            <Link href="#">Forgot password?</Link>
          </RememberForgot>
          <Button type='submit'>Login</Button>
          <RegisterLink>
            <p>Don't have an account? <Link href="#">Register</Link></p>
          </RegisterLink>
        </form>
      </Wrapper>
    </Container>
  );
};

export default LoginForm;
