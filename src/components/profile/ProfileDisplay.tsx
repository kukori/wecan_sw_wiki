import React from 'react';
import { useQueries } from 'react-query';
import styled from 'styled-components';
import { List } from '../common/List';
import { People } from '../../models/People';
import { Spinner } from '../common/Spinner';

export const Property = styled.div`
  font-weight: 400;
  line-height: 18px;
  color: #666666;
`;

export const Value = styled.div`
  font-weight: 500;
  line-height: 18px;
  color: #181818;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #e6e6e6;
`;

export const ValueList = styled.div`
  display: flex;
  flex-direction: column;
`;

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
      <List>
        <InfoRow>
          <Property>Name:</Property>
          <Value>{profile.name}</Value>
        </InfoRow>
        <InfoRow>
          <Property>Birth year:</Property>
          <Value>{profile.birth_year}</Value>
        </InfoRow>
        <InfoRow>
          <Property>Gender:</Property>
          <Value>{profile.gender}</Value>
        </InfoRow>
        <InfoRow>
          <Property>Eye color:</Property>
          <Value>{profile.eye_color}</Value>
        </InfoRow>
        <InfoRow>
          <Property>Hair color:</Property>
          <Value>{profile.hair_color}</Value>
        </InfoRow>
        <InfoRow>
          <Property>Skin color:</Property>
          <Value>{profile.skin_color}</Value>
        </InfoRow>
        <InfoRow>
          <Property>Height:</Property>
          <Value>{profile.height}</Value>
        </InfoRow>
        <InfoRow>
          <Property>Mass:</Property>
          <Value>{profile.mass}</Value>
        </InfoRow>
        <InfoRow>
          <Property>Films:</Property>
          <ValueList>
            {filmQueriesLoading && <Spinner />}
            {filmIsLoadingSuccess &&
              Array.isArray(filmQueries) &&
              filmQueries.map((queryData) => (
                <Value key={queryData.data.title}>{queryData.data.title}</Value>
              ))}
          </ValueList>
        </InfoRow>
        <InfoRow>
          <Property>Species:</Property>
          <ValueList>
            {speciesLoading && <Spinner />}
            {speciesIsLoadingSuccess &&
              Array.isArray(speciesQueries) &&
              speciesQueries.map((queryData) => (
                <Value key={queryData.data.name}>{queryData.data.name}</Value>
              ))}
          </ValueList>
        </InfoRow>
      </List>
    </div>
  );
}
