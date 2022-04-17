import React, { useState } from 'react';
import { useQuery, useQueries } from 'react-query';
import { Species } from '../../models/Species';
import { CharacterItem } from './CharacterItem';

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
    <div>
      <div>CharacterList</div>
      {(peopleQueriesLoading || speciesQuery.isLoading) && <div>Loading</div>}
      {isLoadingSuccess &&
        Array.isArray(peopleQueries) &&
        peopleQueries.map((queryData) => (
          <CharacterItem key={queryData.data.name} character={queryData.data} />
        ))}
    </div>
  );
}
