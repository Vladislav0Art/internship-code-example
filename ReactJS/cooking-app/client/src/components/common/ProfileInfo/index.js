import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// default user image
import defaultUserImage from '../../../img/user-default.svg';

import './ProfileInfo.scss';
import './ProfileInfo-media.scss';

const ProfileInfo = (props) => {
  return (
    <div className="profile-info">
      <div className="profile-avatar">
        <img className="profile-img" src={ props.user.avatarLink !== '' ? props.user.avatarLink : defaultUserImage  } alt={ props.alt }></img>
      </div>
      
      {
        props.userError ? 
         <p className="message-error">{props.userError.msg}</p>
        :
      <div className="profile-user">
        <Link to={props.link} className="profile-link">
          <span className="profile-username">{ props.user.name }</span>
        </Link>
      </div>
      }

    </div>
  );
};

ProfileInfo.propTypes = {
  link: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default ProfileInfo;
