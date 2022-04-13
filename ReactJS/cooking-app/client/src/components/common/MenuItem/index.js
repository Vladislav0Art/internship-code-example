import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './MenuItem.scss';

const MenuItem = (props) => {
  return (
    <Link to={props.link} className={classNames("menu-link", props.classNames)} onClick={props.onClick}>
      { props.content }
    </Link>
  );
}

MenuItem.propTypes = {
  link: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  classNames: PropTypes.array
};

export default MenuItem;
