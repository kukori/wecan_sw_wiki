import React from 'react';
import { useQueries } from 'react-query';
import { People } from '../../models/People';

type Props = {
  profile: People;
};

export function ProfileDisplay({ profile }: Props) {
  const fetchUrl = (url: string) => fetch(url).then((res) => res.json());

  const filmQueries = useQueries({
    queries: profile.films.map((url) => ({
      queryKey: ['films', url],
      queryFn: () => fetchUrl(url)
    }))
  });

  const speciesQueries = useQueries({
    queries: profile.species.map((url) => ({
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
      {(filmQueriesLoading || speciesLoading) && <div>Loading</div>}
      <div>
        <div>
          <div>Name:</div>
          <div>{profile.name}</div>
        </div>
        <div>
          <div>Birth year:</div>
          <div>{profile.birth_year}</div>
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
    </div>
  );
}
