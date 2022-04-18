import React from 'react';
import { Header } from './common/Header';
import { SpeciesList } from './home/SpeciesList';
import { SearchInput } from './home/SearchInput';

export function Home() {
  return (
    <div>
      <Header title="Star Wars Wiki" />
      <SearchInput />
      <SpeciesList />
    </div>
  );
}
