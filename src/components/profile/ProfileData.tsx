import React from 'react';
import { useQuery } from 'react-query';
import { People } from '../../models/People';
import { ProfileDisplay } from './ProfileDisplay';

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
    <div>
      {profileQuery.isLoading && <div>Loading</div>}
      {profileQuery.status === 'success' && profileQuery.data && (
        <ProfileDisplay profile={profileQuery.data} />
      )}
    </div>
  );
}
