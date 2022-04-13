import React from 'react';
// components 
import { ProfileForm } from '../components/index';
// modules
import { Header } from '../modules/index';

const Profile = () => {
  return (
    <React.Fragment>
      <Header />
      <ProfileForm />
    </React.Fragment>
  );
}

export default Profile;
