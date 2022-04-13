import React from 'react';
import PropTypes from 'prop-types';

const Image = ({ src, id = null, deleteImage, small = false }) => {
  return (
    <div className={`creationContent__imageBlock ${ small ? 'creationContent__imageBlock-small' : null }`}>
      <button type="button" className="creationContent__delete" onClick={() => deleteImage(id)}>
        <i className="fas fa-trash-alt"></i>
      </button>
      <img alt="" src={src} className="creationContent__image" />
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.oneOf([null, undefined]).isRequired
  ]),
  deleteImage: PropTypes.func.isRequired
};

export default Image;