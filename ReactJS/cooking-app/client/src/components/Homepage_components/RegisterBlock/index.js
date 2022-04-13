import React from 'react';
import PropTypes from 'prop-types';
import { ServiceButton } from '../../index';

import './RegisterBlock.scss';

const RegisterBlock = (props) => {
  return (
    <div className="section register">
      <div className="container">
        <div className="register__content">
          <h4 className="register__title">{props.title}</h4>
          <ServiceButton 
            type="button"
            classNames={["register__btn"]}
            onClick={props.onClick}
            content={props.buttonContent}
          />
        </div>
      </div>
    </div>
  );
}

RegisterBlock.propTypes = {
  title: PropTypes.string.isRequired,
  buttonContent: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};


export default RegisterBlock;
