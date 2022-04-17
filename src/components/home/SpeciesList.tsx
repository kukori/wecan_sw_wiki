import React from 'react';
import { useQuery } from 'react-query';
import { Species } from '../../models/Species';
import { SpeciesItem } from './SpeciesItem';

export function SpeciesList() {
  const [page, setPage] = React.useState(1);

  const fetchSpecies = (pageIndex: number) =>
    fetch(`https://swapi.dev/api/species/?page=${pageIndex}`).then((res) =>
      res.json()
    );

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(['species', page], () => fetchSpecies(page), {
      keepPreviousData: true
    });

  return (
    <div>
      <div>SpeciesList:</div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        //   ) : isError ? (
        //     <div>Error: {error.message}</div>
        <div>
          {data.results.map((species: Species) => (
            <SpeciesItem key={species.name} species={species} />
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 1}
      >
        Previous Page
      </button>
      <button
        type="button"
        onClick={() => {
          if (!isPreviousData && data.next) {
            setPage((old) => old + 1);
          }
        }}
        disabled={isPreviousData || !data?.next}
      >
        Next Page
      </button>
    </div>
  );
}
