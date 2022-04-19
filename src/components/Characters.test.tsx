import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { Characters } from './Characters';

const testQueryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

function MockCharacters() {
  return (
    <MemoryRouter initialEntries={[`/characters/2`]}>
      <QueryClientProvider client={testQueryClient}>
        <Routes>
          <Route path="/characters/:speciesId" element={<Characters />} />
        </Routes>
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe('Character', () => {
  it('Should be two people as a result', async () => {
    render(<MockCharacters />);
    const results = await screen.findAllByTestId(/people-test/i);
    expect(results.length).toBe(2);
  });
});
