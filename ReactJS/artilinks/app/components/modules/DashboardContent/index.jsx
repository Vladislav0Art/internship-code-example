import React from 'react';
// modules
import { BookmarkList } from '../../modules';
// styles
import styles from './styles.module.scss';



const DashboardContent = () => {
	return (
		<div className={styles.container}>
			<div className={styles.panel}>Dashboard top panel</div>

			<div className={styles.content}>
				<BookmarkList viewMode={"list"} />
			</div>
		</div>
	);
}

export default DashboardContent;
