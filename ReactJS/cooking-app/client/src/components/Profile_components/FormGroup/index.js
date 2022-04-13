import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// styles
import './FormGroup.scss';
import './FormGroup-media.scss';

const FormGroup = (props) => {
  return (
    <div className="formGroup">
      
      <h5 className="formGroup__title">{ props.title }</h5>
      <div className={classNames(props.classNames, "formGroup__content")}>
        { props.children }
      </div>

    </div>
  );
};

FormGroup.propTypes = {
  title: PropTypes.string.isRequired,
  classNames:PropTypes.array 
};

export default FormGroup;
