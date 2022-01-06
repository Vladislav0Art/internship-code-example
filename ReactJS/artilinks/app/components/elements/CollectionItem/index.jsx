import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// modules
import { CollectionFloatingWindow } from '../../modules';
// styles
import styles from './styles.module.scss';
// images
import dotsIcon from '/public/svg/dashboard/dots-icon.svg';
import defaultCollectionIcon from '/public/svg/dashboard/default-collection-icon.svg';


const CollectionItem = ({
	collection,
	viewedCollectionId,
	onCollectionClick,
	disableActions
}) => {
	const { icon, label, bookmarksCount } = collection;

	const [isFloatingWindowOpened, setIsFloatingWindowOpened] = useState(false);

	// toggling floating window of dots icon button
	const toggleFloatingWindow = () => setIsFloatingWindowOpened(prevState => !prevState);

	return (
		<React.Fragment>
			<div
				onClick={onCollectionClick} 
				className={classNames({
					[styles.content]: true,
					[styles.selected]: viewedCollectionId === collection._id
				})}
			>
				<div className={styles.main}>
					<img 
						className={styles.icon} 
						width={13}
						height={13} 
						src={icon ? icon : defaultCollectionIcon.src} 
						alt="Collection icon"
					/>
					<span>{ label }</span>

					{
						!disableActions && 
						<div onClick={toggleFloatingWindow} className={styles.dots}>
							<img src={dotsIcon.src} alt="Dots icon" />
						</div>
					}
				</div>
				<span className={styles.bookmarksCount}>{ bookmarksCount }</span>
			</div>

			<CollectionFloatingWindow transitionIn={isFloatingWindowOpened} />
		</React.Fragment>
	);
};


// default props
CollectionItem.defaultProps = {
	disableActions: false
};

// prop types
CollectionItem.propTypes = {
	collection: PropTypes.shape({
		icon: PropTypes.string,
		label: PropTypes.string.isRequired,
		bookmarksCount: PropTypes.number.isRequired,
	}).isRequired,
	viewedCollectionId: PropTypes.string.isRequired,
	disableActions: PropTypes.bool.isRequired,
	onCollectionClick: PropTypes.func.isRequired,	
};


export default CollectionItem;
