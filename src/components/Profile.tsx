import React from 'react';
import { useParams } from 'react-router-dom';
import { Header } from './common/Header';
import { ProfileData } from './profile/ProfileData';

export function Profile() {
  const { profileId } = useParams();

  return (
    <div>
      <Header title="Profile" />
      {profileId && <ProfileData profileId={profileId} />}
    </div>
  );
}
