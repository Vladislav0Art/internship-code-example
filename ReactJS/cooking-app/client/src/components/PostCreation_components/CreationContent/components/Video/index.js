import React from 'react';
import PropTypes from 'prop-types';
// components
import { ServiceButton } from '../../../../index';


const Video = ({ src, deleteVideo }) => {
  return (
    <div className="creationContent__videoBlock">
      <video src={src} autoPlay={false} controls className="creationContent__video" />
      < ServiceButton type="button" content="delete" onClick={deleteVideo} />
    </div>
  );
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
  deleteVideo: PropTypes.func.isRequired
};


export default Video;