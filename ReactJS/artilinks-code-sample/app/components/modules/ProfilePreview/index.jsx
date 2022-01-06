import React from 'react';
import PropTypes from 'prop-types';
// hooks
import { useUser } from '../../../hooks';
// styles
import styles from './styles.module.scss';
// images 
import defaultAvatar from '/public/svg/dashboard/default-avatar.svg';
import caretIcon from '/public/svg/dashboard/caret-down.svg'


const ProfilePreview = ({ onIconClick }) => {
	const { user } = useUser();
	
	return (
		<div className={styles.content}>
			<img 
				className={styles.avatar} 
				width={30} 
				height={30} 
				src={user.avatar ? user.avatar : defaultAvatar.src} 
				alt="Avatar"
			/>
			<span className={styles.username}>
				<span>{ user.firstName }</span>
				<span>{ user.lastName }</span>
			</span>

			<div className={styles.icon}>
				<img
					height={caretIcon.height} 
					width={caretIcon.width} 
					src={caretIcon.src}
					alt="Button icon"
					onClick={onIconClick}
				/>
			</div>
		</div>
	);
};


// prop types
ProfilePreview.propTypes = {
	onIconClick: PropTypes.func.isRequired
};


export default ProfilePreview;
