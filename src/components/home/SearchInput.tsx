import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchInput() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  return (
    <div>
      <input
        type="text"
        onChange={(event: FormEvent<HTMLInputElement>) =>
          setSearchText(event.currentTarget.value)
        }
      />
      <button
        disabled={!searchText || searchText.length < 2}
        type="button"
        onClick={() => navigate(`/search/${searchText}`)}
      >
        Search
      </button>
    </div>
  );
}
