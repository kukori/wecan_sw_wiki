import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes, MemoryRouter } from 'react-router-dom';
import { Profile } from './Profile';

const testQueryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

function MockProfile() {
  return (
    <MemoryRouter initialEntries={['/profile/2']}>
      <QueryClientProvider client={testQueryClient}>
        <Routes>
          <Route path="/profile/:profileId" element={<Profile />} />
        </Routes>
      </QueryClientProvider>
    </MemoryRouter>
  );
}

describe('Profile', () => {
  it('Character should be on the screen', async () => {
    render(<MockProfile />);
    const species = await screen.findByText(/C-3PO/i);
    expect(species).toBeInTheDocument();
    // screen.debug();
  });

  it('Film title that belong to the profile should be on the screen', async () => {
    render(<MockProfile />);
    const species = await screen.findByText(/A New Hope/i);
    expect(species).toBeInTheDocument();
    // screen.debug();
  });
});
