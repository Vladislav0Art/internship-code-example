import React from 'react';
// modules
import { Header } from '../modules/index';
// components 
import { CreationContent } from '../components/index';

const PostCreation = (props) => {
  return (
    <React.Fragment>
      <Header />
      <CreationContent />
    </React.Fragment>
  );
}

export default PostCreation;
