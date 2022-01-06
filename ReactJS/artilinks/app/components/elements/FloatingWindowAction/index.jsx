import React from 'react';
import PropTypes from 'prop-types';
// styles
import styles from './styles.module.scss';


const FloatingWindowAction = ({ children }) => (<div className={styles.action}>{ children }</div>);

// prop types
FloatingWindowAction.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
};


export default FloatingWindowAction;
