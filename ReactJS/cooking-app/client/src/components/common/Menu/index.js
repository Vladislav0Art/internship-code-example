import React from 'react';
import PropTypes from 'prop-types';

import './Menu.scss';

const Menu = (props) => {
  return (
    <div className="mainmenu">
      <div className="mainmenu__content">
        { props.children }
      </div>
    </div>
  );
}

Menu.propTypes = {
  children: PropTypes.array
};

export default Menu;
