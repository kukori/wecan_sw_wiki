import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Species } from '../../models/Species';
import { SpeciesItem } from './SpeciesItem';
import { Button } from '../common/Button';
import { List } from '../common/List';
import { Title } from '../common/Title';
import { CenteredContainer } from '../common/CenteredContainer';
import { Spinner } from '../common/Spinner';

type QueryResult = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Species[];
};

const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export function SpeciesList() {
  const [page, setPage] = React.useState(1);

  const fetchSpecies = (pageIndex: number) =>
    fetch(`https://swapi.dev/api/species/?page=${pageIndex}`).then((res) =>
      res.json()
    );

  const { isLoading, isSuccess, isError, error, data, isPreviousData } =
    useQuery<QueryResult, Error>(['species', page], () => fetchSpecies(page), {
      keepPreviousData: true
    });

  return (
    <CenteredContainer>
      <div>
        <Title>SpeciesList:</Title>
        {isLoading && <Spinner />}
        {isError && <div>Error: {error.message}</div>}
        <List>
          {isSuccess &&
            Array.isArray(data.results) &&
            data.results.map((species: Species) => (
              <SpeciesItem key={species.name} species={species} />
            ))}
        </List>
        <ButtonContainer>
          <Button
            type="button"
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            type="button"
            onClick={() => {
              if (!isPreviousData && data?.next) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || !data?.next}
          >
            Next
          </Button>
        </ButtonContainer>
      </div>
    </CenteredContainer>
  );
}
