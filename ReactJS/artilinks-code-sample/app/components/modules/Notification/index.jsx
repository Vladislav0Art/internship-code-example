import React from 'react';
// modules
import { Modal } from '..';
// elements
import { Alert } from '../../elements';
// hooks
import { useNotification } from '../../../hooks';


const Notification = () => {
	const { notification, removeNotification } = useNotification();
	
	return (
		<Modal isModalVisible={notification.isNotification}>
			<Alert
				type={notification.type}
				title={notification.title}
				message={notification.message}
				onConfirm={removeNotification}
			/>
		</Modal>
	);
}

export default Notification;
