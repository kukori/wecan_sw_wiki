import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './common/Header';
import { SearchResult } from './search/SearchResult';

export function Search() {
  const { searchText } = useParams();

  return (
    <div>
      <Header title="Search result" />
      {searchText && <SearchResult query={searchText} />}
    </div>
  );
}
