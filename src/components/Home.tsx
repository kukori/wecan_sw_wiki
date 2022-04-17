import React from 'react';
import { Header } from './common/Header';
import { SpeciesList } from './home/SpeciesList';

export function Home() {
  return (
    <div>
      <Header title="Star Wars Wiki" />
      <SpeciesList />
    </div>
  );
}
