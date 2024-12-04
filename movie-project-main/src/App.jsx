import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Teacher from './pages/Teacher';
import Subscription from './pages/subscription'; // تعديل الاسم ليطابق الاسم الصحيح
import Navbar from './components/Navbar';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}
