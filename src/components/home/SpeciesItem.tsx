import React from 'react';
import { StyledLink } from '../common/StyledLink';
import { Species } from '../../models/Species';

type Props = {
  species: Species;
};

export function SpeciesItem({ species }: Props) {
  return (
    <StyledLink to={`/characters/${species.url.match(/\d+/)}`}>
      {species.name}
    </StyledLink>
  );
}
