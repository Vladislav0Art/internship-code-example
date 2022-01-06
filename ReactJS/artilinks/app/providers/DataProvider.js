import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// services
// import DataService from '../utils/client-services/DataService';
// contexts
import { DataContext } from '../contexts';


const DataProvider = ({ children, data }) => {
	const [groups, setGroups] = useState(data.groups);
	const [collections, setCollections] = useState(data.collections);
	const [bookmarks, setBookmarks] = useState(data.bookmarks);

	// setting default viewed collection as collection with all bookmarks
	const [viewedCollectionId, setViewedCollectionId] = useState(process.env.collections.ALL_BOOKMARKS_COLLECTION_ID);

	// bookmarks of viewed collection
	const [viewedBookmarks, setViewedBookmarks] = useState(bookmarks);

	const [isLoadingData, setIsLoadingData] = useState(false);


	// filtering bookmarks by collection id
	const filterBookmarksByCollectionId = (collectionId) => {
		let result = null;
		// if viewed collection is collection with all bookmarks
		if(collectionId === process.env.collections.ALL_BOOKMARKS_COLLECTION_ID) {
			result = bookmarks;
		}
		// if view collection is collection with unsorted bookmarks
		else if(collectionId === process.env.collections.UNSORTED_BOOKMARKS_COLLECTION_ID) {
			result = bookmarks.filter(bookmark => bookmark.collectionId === null);
		}
		else {
			// filtering bookmarks with collection id equal to viewed collection id
			result = bookmarks.filter(bookmark => bookmark.collectionId === collectionId);
		}

		return result;
	};


	// setting viewed collection id and viewed bookmarks
	const setViewedCollectionIdAndBookmarks = (collectionId) => {
		setViewedCollectionId(collectionId);
		const resultBookmarks = filterBookmarksByCollectionId(collectionId);
		// setting viewed bookmarks
		setViewedBookmarks(resultBookmarks);
	};



	// context value
	const contextValue = {
		groups, 
		collections,
		bookmarks,
		isLoadingData,

		viewedCollectionId,
		viewedBookmarks,

		setViewedCollectionIdAndBookmarks,
	};

	return <DataContext.Provider value={contextValue}>{ children }</DataContext.Provider>
};


// prop types
const requiredArrayOfObjects = PropTypes.arrayOf(PropTypes.object).isRequired;

DataProvider.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	data: PropTypes.shape({
		groups: requiredArrayOfObjects,
		collections: requiredArrayOfObjects,
		bookmarks: requiredArrayOfObjects,
	}).isRequired,
};


export default DataProvider;