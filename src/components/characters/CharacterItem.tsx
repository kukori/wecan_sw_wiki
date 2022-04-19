import React from 'react';
import { StyledLink } from '../common/StyledLink';
import { People } from '../../models/People';

type Props = {
  character: People;
};

export function CharacterItem({ character }: Props) {
  return (
    <StyledLink
      data-testid="people-test"
      to={`/profile/${character.url.match(/\d+/)}`}
    >
      {character.name}
    </StyledLink>
  );
}
