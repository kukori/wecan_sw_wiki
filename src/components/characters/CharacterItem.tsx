import React from 'react';
import { Link } from 'react-router-dom';
import { People } from '../../models/People';

type Props = {
  character: People;
};

export function CharacterItem({ character }: Props) {
  return (
    <p>
      <Link to={`/profile/${character.url.match(/\d+/)}`}>
        {character.name}
      </Link>
    </p>
  );
}
