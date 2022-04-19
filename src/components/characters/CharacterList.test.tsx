import React from 'react';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { CharacterList } from './CharacterList';

const testQueryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

function MockCharacterList() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <CharacterList speciesId="2" />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe('CharacterList', () => {
  it('Character should be on the screen', async () => {
    render(<MockCharacterList />);
    const specie = await screen.findByText(/C-3PO/i);
    expect(specie).toBeInTheDocument();
    // screen.debug();
  });
});
