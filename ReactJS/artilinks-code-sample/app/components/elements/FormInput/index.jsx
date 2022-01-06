import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// styles
import styles from './styles.module.scss';
// contexts
import { FormContext } from '../../../contexts';



const FormInput = ({ 
  placeholder,
  name,
  type,
}) => {
  
  // retriving data from form context
  const formContext = useContext(FormContext);
  const { form, handleFormInputChange } = formContext;

  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      name={name}
      value={form[name]}
      onChange={handleFormInputChange}
    />
  );
};


// default props
FormInput.defaultProps = {
	type: 'text'
};


// prop types
FormInput.propTypes = {
	placeholder: PropTypes.string,
	name: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'password', 'email', 'search', 'tel'])
};


export default FormInput;
