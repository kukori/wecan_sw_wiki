import React from 'react';
import { Species } from '../../models/Species';

type Props = {
  species: Species;
};

export function SpeciesItem({ species }: Props) {
  return <p>{species.name}</p>;
}
