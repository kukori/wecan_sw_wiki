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

/**
 * Displays the search result depending on the query input prop.
 * If there is no result it displays a message. If the result count is 1
 * it uses the ProfileDisplay component to show the data. If there is more
 * than one result we display a list of CharacterItems that have links
 * pointing to the profiles.
 *
 * @export
 * @param {Props} { query: string }
 * @returns {*}
 */
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
