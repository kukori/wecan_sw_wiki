import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../common/Button';
import { CenteredContainer } from '../common/CenteredContainer';

const SearchContainer = styled.div`
  display: flex;
  width: 300px;
  margin: 20px;
`;

const Input = styled.input`
  padding: 0 10px;
  min-width: 120px;
  height: 40px;
  font-size: 16px;
  font-weight: 500;
  background: #fff;
  border: 1px solid #3c3c43;
  border-radius: 3px;
  color: #3c3c43;
`;

export function SearchInput() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  return (
    <CenteredContainer>
      <SearchContainer>
        <Input
          type="text"
          onChange={(event: FormEvent<HTMLInputElement>) =>
            setSearchText(event.currentTarget.value)
          }
        />
        <Button
          disabled={!searchText || searchText.length < 2}
          type="button"
          onClick={() => navigate(`/search/${searchText}`)}
        >
          Search
        </Button>
      </SearchContainer>
    </CenteredContainer>
  );
}
