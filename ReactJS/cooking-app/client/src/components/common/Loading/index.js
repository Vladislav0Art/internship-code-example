import React from 'react';
// components
import Loader from 'react-loader-spinner';
// styles
import './Loading.scss';
import './Loading-media.scss';

const Loading = () => {
  return (
    <div className="loading">
      <div className="container">
        <div className="loading__content">
          <Loader
          className="loading__icon"
            type="Oval"
            color="#5E5E5E"
            height={280}
            width={280}
          />
          <h3 className="loading__title">Loading Content.</h3>
          <p className="loading__text">Please, wait for a while...</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
