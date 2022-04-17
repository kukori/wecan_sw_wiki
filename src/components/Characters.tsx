import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './common/Header';
import { CharacterList } from './characters/CharacterList';

export function Characters() {
  const { speciesId } = useParams();

  return (
    <div>
      <Header title="Characters" />
      {speciesId && <CharacterList speciesId={speciesId} />}
    </div>
  );
}
