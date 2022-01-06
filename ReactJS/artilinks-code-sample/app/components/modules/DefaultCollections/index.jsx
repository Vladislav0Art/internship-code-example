import React from 'react';
// elements
import { CollectionItem } from '../../elements';
// hooks
import { useData } from '../../../hooks';
// styles 
import styles from './styles.module.scss';
// images
import allBookmarksIcon from '/public/svg/dashboard/all-bookmarks-icon.svg';
import unsortedBookmarksIcon from '/public/svg/dashboard/unsorted-bookmarks-icon.svg';




const DefaultCollections = () => {
	const { bookmarks, viewedCollectionId, setViewedCollectionIdAndBookmarks } = useData();

	// default collection for all bookmarks
	const allBookmarksCollection = {
		_id: process.env.collections.ALL_BOOKMARKS_COLLECTION_ID,
		label: 'All bookmarks',
		icon: allBookmarksIcon.src,
		bookmarksCount: bookmarks.length
	};

	// default collection for unsorted bookmarks 
	const unsortedBookmarksCollection = {
		_id: process.env.collections.UNSORTED_BOOKMARKS_COLLECTION_ID,
		label: 'Unsorted',
		icon: unsortedBookmarksIcon.src,
		bookmarksCount: bookmarks.filter(bookmark => bookmark.collectionId === null).length
	};

	return (
		<div className={styles.content}>
			<CollectionItem 
				collection={allBookmarksCollection}
				viewedCollectionId={viewedCollectionId}
				onCollectionClick={() => setViewedCollectionIdAndBookmarks(allBookmarksCollection._id)}
				disableActions
			/>
			<CollectionItem 
				collection={unsortedBookmarksCollection}
				viewedCollectionId={viewedCollectionId}
				onCollectionClick={() => setViewedCollectionIdAndBookmarks(unsortedBookmarksCollection._id)}
				disableActions
			/>
		</div>
	);
}

export default DefaultCollections;
