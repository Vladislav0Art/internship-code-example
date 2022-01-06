import { createContext } from "react";

// data (groups, collections, bookmarks) context
const DataContext = createContext({
	groups: null,
	collections: null,
	bookmarks: null,
	isLoadingData: null,

	viewedCollectionId: null,
	viewedBookmarks: null,

	setViewedCollectionId: () => {},
	getBookmarksOfViewedCollection: () => {},
});

export default DataContext;