import React from 'react';
import { useQuery } from 'react-query';
import { People } from '../../models/People';
import { ProfileDisplay } from '../profile/ProfileDisplay';
import { CharacterItem } from '../characters/CharacterItem';
import { CenteredContainer } from '../common/CenteredContainer';
import { Spinner } from '../common/Spinner';
import { List } from '../common/List';

type Props = {
  query: string;
};

type QueryResult = {
  count: number;
  results: People[];
};

export function SearchResult({ query }: Props) {
  const searchProfiles = (searchQuery: string) =>
    fetch(`https://swapi.dev/api/people/?search=${searchQuery}`).then((res) =>
      res.json()
    );

  const searchQuery = useQuery<QueryResult, Error>(
    ['people_search', query],
    () => searchProfiles(query)
  );

  return (
    <CenteredContainer>
      <div>
        {searchQuery.isLoading && <Spinner />}
        {searchQuery.status === 'success' && searchQuery.data.count === 0 && (
          <div>No profile found...</div>
        )}
        {searchQuery.status === 'success' && searchQuery.data.count === 1 && (
          <ProfileDisplay profile={searchQuery.data.results[0]} />
        )}
        <List>
          {searchQuery.status === 'success' &&
            searchQuery.data.count > 1 &&
            searchQuery.data.results.map((people) => (
              <CharacterItem key={people.name} character={people} />
            ))}
        </List>
      </div>
    </CenteredContainer>
  );
}
