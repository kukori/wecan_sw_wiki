import React from 'react';
import { useQuery } from 'react-query';
import { People } from '../../models/People';
import { ProfileDisplay } from './ProfileDisplay';
import { CenteredContainer } from '../common/CenteredContainer';
import { Spinner } from '../common/Spinner';

type Props = {
  profileId: string;
};

export function ProfileData({ profileId }: Props) {
  const fetchProfile = (id: string) =>
    fetch(`https://swapi.dev/api/people/${id}`).then((res) => res.json());

  const profileQuery = useQuery<People, Error>(['people', profileId], () =>
    fetchProfile(profileId)
  );

  return (
    <CenteredContainer>
      <div>
        {profileQuery.isLoading && <Spinner />}
        {profileQuery.status === 'success' && profileQuery.data && (
          <ProfileDisplay profile={profileQuery.data} />
        )}
      </div>
    </CenteredContainer>
  );
}
