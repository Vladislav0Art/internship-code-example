import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ServiceButton.scss';

const ServiceButton = (props) => {
  return (
    <button type={props.type} className={classNames('black-button', props.classNames)} onClick={props.onClick}>
			{ props.content }
    </button>
  );
}

ServiceButton.propTypes = {
	classNames: PropTypes.array,
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
	onClick: PropTypes.func
};


export default ServiceButton;