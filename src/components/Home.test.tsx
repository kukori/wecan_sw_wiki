import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Home } from './Home';

const testQueryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

function MockHome() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={testQueryClient}>
        <Home />
      </QueryClientProvider>
    </BrowserRouter>
  );
}

describe('Home', () => {
  it('Should render input element', () => {
    render(<MockHome />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('Should be able to type to input element', () => {
    render(<MockHome />);
    const inputElement: HTMLInputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'Luke' } });
    expect(inputElement.value).toBe('Luke');
  });

  it('Search button should not be disabled after typing into text field', () => {
    render(<MockHome />);
    const buttonElement = screen.getByText('Search');
    const inputElement: HTMLInputElement = screen.getByRole('textbox');
    expect(buttonElement).toBeDisabled();
    fireEvent.change(inputElement, { target: { value: 'Luke' } });
    expect(buttonElement).not.toBeDisabled();
  });
});
