import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// hooks
import { useData } from '../../../hooks';
// elements
import { Bookmark } from '../../elements';
// styles
import styles from './styles.module.scss';



const BookmarkList = ({ viewMode }) => {
	const { viewedBookmarks } = useData();

	const viewModes = {
		list: 'list',
		card: 'card',
		headline: 'headline',
	};

	const containerClassNames = classNames({
		[styles.wrapper]: true,
		[styles.wrapperList]: viewMode === viewModes.list,
		[styles.wrapperCard]: viewMode === viewModes.card,
		[styles.wrapperHeadline]: viewMode === viewModes.headline,
	});

	return (
		<div className={containerClassNames}>
			{ 
				viewedBookmarks.map(bookmark => 
					<Bookmark 
						key={bookmark._id}
						bookmark={{
							...bookmark.data,
							date: bookmark.createdAt
						}}
						mode={viewMode}
					/>
				)
			}
		</div>
	);
};


// prop types
BookmarkList.propTypes = {
	viewMode: PropTypes.oneOf(['list', 'card', 'headline'])
};


export default BookmarkList;
