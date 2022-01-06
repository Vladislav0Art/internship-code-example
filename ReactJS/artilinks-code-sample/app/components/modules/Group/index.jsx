import React, { useState } from 'react';
import PropTypes from 'prop-types';
// modules
import { CollectionList, GroupFloatingWindow } from '../../modules';
// hooks
import { useData } from '../../../hooks';
// styles 
import styles from './styles.module.scss';
// images
import dotsIcon from '/public/svg/dashboard/dots-icon.svg';
import caretIcon from '/public/svg/dashboard/caret-down.svg';



const Group = ({ group }) => {
	const { _id: id, label, isVisible } = group;
	const { collections } = useData();

	const [isFloatingWindowOpened, setIsFloatingWindowOpened] = useState(false);

	// toggling floating window of dots icon button
	const toggleFloatingWindow = () => setIsFloatingWindowOpened(prevState => !prevState);

	return (
		<div className={styles.content}>
			<div className={styles.group}>
				<div className={styles.caret}><img src={caretIcon.src} alt="Caret icon" /></div>
				<span>{ label }</span>
				<div onClick={toggleFloatingWindow} className={styles.dots}>
					<img src={dotsIcon.src} alt="Dots icon"/>
				</div>
			</div>

			<div className={styles.floatingWindow}>
				<GroupFloatingWindow transitionIn={isFloatingWindowOpened} />
			</div>

			<div className={styles.collectionList}>
				<CollectionList collections={collections.filter(collection => collection.groupId === id)} />
			</div>
		</div>
	);
};


// prop types
const requiredString = PropTypes.string.isRequired;

Group.propTypes = {
	group: PropTypes.shape({
		_id: requiredString,
		label: requiredString,
		isVisible: PropTypes.bool.isRequired
	}),
};


export default Group;
