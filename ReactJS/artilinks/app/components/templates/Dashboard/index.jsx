import React from 'react';
// modules
import { Sidebar, DashboardContent } from '../../modules';
// hooks
import { useData } from '../../../hooks';
// styles
import styles from './styles.module.scss';


const Dashboard = () => {
	const { groups, collections, bookmarks } = useData();

	console.log('groups', groups);
	console.log('collections', collections);
	console.log('bookmarks', bookmarks);

	return (
		<div className={styles.wrapper}>
			<Sidebar />
			<DashboardContent />
		</div>
	);
}

export default Dashboard;
