import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './Logo.scss';

const Logo = (props) => {
  return (
    <Link to="/" className={classNames("logo", props.logoClassNames)}>
      Cooking<span className="logo-span">App</span>
    </Link>
  );
}

Logo.propTypes = {
  logoClassNames: PropTypes.array
};

export default Logo;
