import React, { useState } from 'react';
import { useQuery, useQueries } from 'react-query';
import { People } from '../../models/People';

type Props = {
  profileId: string;
};

export function ProfileData({ profileId }: Props) {
  const [films, setFilms] = useState<string[]>([]);
  const [species, setSpecies] = useState<string[]>([]);

  const fetchProfile = (id: string) =>
    fetch(`https://swapi.dev/api/species/${id}`).then((res) => res.json());

  const fetchUrl = (url: string) => fetch(url).then((res) => res.json());

  const profileQuery = useQuery<People, Error>(
    ['people', profileId],
    () => fetchProfile(profileId),
    {
      onSuccess: (people) => {
        setFilms(people.films);
        setSpecies(people.species);
      }
    }
  );

  const filmQueries = useQueries({
    queries: films.map((url) => ({
      queryKey: ['films', url],
      queryFn: () => fetchUrl(url)
    }))
  });

  const speciesQueries = useQueries({
    queries: species.map((url) => ({
      queryKey: ['species', url],
      queryFn: () => fetchUrl(url)
    }))
  });

  const filmIsLoadingSuccess = filmQueries.every(
    (result) => result.status === 'success'
  );

  const speciesIsLoadingSuccess = speciesQueries.every(
    (result) => result.status === 'success'
  );

  const filmQueriesLoading = filmQueries.some((result) => result.isLoading);
  const speciesLoading = speciesQueries.some((result) => result.isLoading);

  return (
    <div>
      {(filmQueriesLoading || speciesLoading || profileQuery.isLoading) && (
        <div>Loading</div>
      )}
      {profileQuery.status === 'success' && profileQuery.data && (
        <div>
          <div>
            <div>Name:</div>
            <div>{profileQuery.data.name}</div>
          </div>
          <div>
            <div>Birth year:</div>
            <div>{profileQuery.data.birth_year}</div>
          </div>
          <div>
            <div>Films:</div>
            <div>
              {filmIsLoadingSuccess &&
                Array.isArray(filmQueries) &&
                filmQueries.map((queryData) => (
                  <div key={queryData.data.title}>{queryData.data.title}</div>
                ))}
            </div>
          </div>
          <div>
            <div>Species:</div>
            <div>
              {speciesIsLoadingSuccess &&
                Array.isArray(speciesQueries) &&
                speciesQueries.map((queryData) => (
                  <div key={queryData.data.name}>{queryData.data.name}</div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
