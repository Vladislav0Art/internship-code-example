import { useState } from 'react';
import PropTypes from 'prop-types';
// contexts
import { NotificationContext } from '../contexts';



const NotificationProvider = ({ children }) => {
	const notificationTypes = {
		error: 'error',
		info: 'info',
		warning: 'warning'
	};

	const initialNotificationState = {
		title: null,
		message: null,
		type: null,
		isNotification: false
	};
	
	const [notification, setNotification] = useState(initialNotificationState);

	// setting notification to initial value
	const removeNotification = () => setNotification(initialNotificationState);

	// adding error
	const addErrorNotification = (err) => {
		setNotification({
			title: 'Error occurred!',
			message: err?.message || 'Something went wrong.',
			type: notificationTypes.error,
			isNotification: true
		});
	};

	// adding warning
	const addWarningNotification = ({ title, message }) => {
		setNotification({
			title: title ?? 'Warning!',
			message: message ?? '',
			type: notificationTypes.warning,
			isNotification: true
		});
	};


	// adding info
	const addInfoNotification = ({ title, message }) => {
		setNotification({
			title: title ?? 'Information:',
			message: message ?? '',
			type: notificationTypes.info,
			isNotification: true
		});
	}

	// error context value
	const contextValue = {
		notification,
		addErrorNotification,
		addWarningNotification,
		addInfoNotification,
		removeNotification,
	};

	return (
		<NotificationContext.Provider value={contextValue}>{ children }</NotificationContext.Provider>
	);
};


// prop types
NotificationProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
};


export default NotificationProvider;