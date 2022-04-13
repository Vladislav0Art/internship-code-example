import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Input.scss';

const Input = (props) => {
  return (
    <input 
      id={props.id} 
      type={props.type} 
      name={props.name} 
      className={classNames("input", props.classNames)} 
      placeholder={props.placeholder} 
      required={props.required}
      defaultValue={props.value ? props.value : ''}
      multiple={props.multiple ? props.multiple : ''}
      accept={props.accept ? props.accept : ''}
      onChange={props.onChange ? props.onChange : null}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  classNames: PropTypes.array,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  required: PropTypes.string,
  value: PropTypes.string,
  multiple: PropTypes.string,
  accept: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
