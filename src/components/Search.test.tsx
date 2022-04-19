import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { Search } from './Search';

const testQueryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

type Props = {
  searchQuery: string;
};

function MockSearch({ searchQuery }: Props) {
  return (
    <MemoryRouter initialEntries={[`/search/${searchQuery}`]}>
      <QueryClientProvider client={testQueryClient}>
        <Routes>
          <Route path="/search/:searchText" element={<Search />} />
        </Routes>
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe('Search', () => {
  it('Should be two people as a result', async () => {
    render(<MockSearch searchQuery="lu" />);
    const results = await screen.findAllByTestId(/people-test/i);
    expect(results.length).toBe(2);
  });

  it('Lukes profile should be shown', async () => {
    render(<MockSearch searchQuery="luke" />);
    const result = await screen.findByText(/Luke Skywalker/i);
    expect(result).toBeInTheDocument();
  });

  it('Should have no result for jsadhfkjashf', async () => {
    render(<MockSearch searchQuery="jsadhfkjashf" />);
    const result = await screen.findByText(/No profile found/i);
    expect(result).toBeInTheDocument();
  });
});
