import React from 'react';
import PropTypes from 'prop-types';

import './MediaBlock.scss';

const MediaBlock = (props) => {
  return (
    <div className="mediablock">
      <div className="mediablock__item">
        <span className="mediablock__span">{ props.views }</span>
        <i className="far fa-eye"></i>
      </div>

      <div className="mediablock__item">
        <span className="mediablock__span">{ props.likes }</span>
        
        <button type="button" className="mediablock__btn" onClick={props.likePost}>
          <i className="fas fa-heart"></i>
        </button>
      </div>
    </div>
  );
}

MediaBlock.propTypes = {
  views: PropTypes.string.isRequired,
  likes: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

export default MediaBlock;
