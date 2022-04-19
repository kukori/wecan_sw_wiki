import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Characters } from './components/Characters';
import { Profile } from './components/Profile';
import { Search } from './components/Search';

export function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters/:speciesId" element={<Characters />} />
        <Route path="/profile/:profileId" element={<Profile />} />
        <Route path="/search/:searchText" element={<Search />} />
      </Routes>
    </div>
  );
}
