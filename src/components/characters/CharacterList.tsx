import React, { useState } from 'react';
import { useQuery, useQueries } from 'react-query';
import { Species } from '../../models/Species';
import { CharacterItem } from './CharacterItem';
import { List } from '../common/List';
import { Title } from '../common/Title';
import { CenteredContainer } from '../common/CenteredContainer';
import { Spinner } from '../common/Spinner';

type Props = {
  speciesId: string;
};

export function CharacterList({ speciesId }: Props) {
  const [people, setPeople] = useState<string[]>([]);

  const fetchSpecies = (id: string) =>
    fetch(`https://swapi.dev/api/species/${id}`).then((res) => res.json());

  const fetchPeople = (url: string) => fetch(url).then((res) => res.json());

  // const { isLoading, isError, error, data } = useQuery(
  const speciesQuery = useQuery<Species, Error>(
    ['species', speciesId],
    () => fetchSpecies(speciesId),
    {
      onSuccess: (species) => {
        setPeople(species.people);
      }
    }
  );

  const peopleQueries = useQueries({
    queries: people.map((url) => ({
      queryKey: ['people', url],
      queryFn: () => fetchPeople(url)
    }))
  });

  const isLoadingSuccess = peopleQueries.every(
    (result) => result.status === 'success'
  );

  const peopleQueriesLoading = peopleQueries.some((result) => result.isLoading);

  return (
    <CenteredContainer>
      <div>
        <Title>CharacterList:</Title>
        {(peopleQueriesLoading || speciesQuery.isLoading) && <Spinner />}
        <List>
          {isLoadingSuccess &&
            Array.isArray(peopleQueries) &&
            peopleQueries.map((queryData) => (
              <CharacterItem
                key={queryData.data.name}
                character={queryData.data}
              />
            ))}
        </List>
      </div>
    </CenteredContainer>
  );
}
