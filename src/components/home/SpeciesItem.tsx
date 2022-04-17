import React from 'react';
import { Link } from 'react-router-dom';
import { Species } from '../../models/Species';

type Props = {
  species: Species;
};

export function SpeciesItem({ species }: Props) {
  return (
    <p>
      <Link to={`/characters/${species.url.match(/\d+/)}`}>{species.name}</Link>
    </p>
  );
}
