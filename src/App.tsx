import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import './App.css';

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
