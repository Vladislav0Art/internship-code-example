// models
const Bookmark = require('../../utils/db/models/datadocs/Bookmark');
// services
const CollectionService = require('../../utils/server-services/CollectionService');
const BookmarkService = require('../../utils/server-services/BookmarkService');
// utils
const ApiError = require('../../utils/exceptions/ApiError');
const respondWithError = require('../../utils/exceptions/respondWithError');




// updating any fields of bookmark in db (fields: collectionId, title, description, imgSrc)
// note: collectionId may have null value, in this case bookmark is set to unsorted category
const updateBookmark = async (req, res) => {
	const user = req.user;

	// if user is not defined
	if(!user) {
		return respondWithError(ApiError.UnauthorizedError(), res);
	}

	const {
		bookmarkId,
		collectionId,
		title,
		description,
		imgSrc
	} = req.body;

	// if bookmark id is not provided
	if(!bookmarkId) {
		return respondWithError(ApiError.BadRequest('Bookmark id is not provided'), res);
	}

	// if all fields are empty
	if(!(collectionId !== undefined || title || description || imgSrc)) {
		return respondWithError(ApiError.BadRequest('Cannot update with empty fields'), res);
	}

	try {
		// if bookmark with provided id does not exist in user account
		if(!(await BookmarkService.exists({ _id: bookmarkId, userId: user.id }))) {
			throw ApiError.BadRequest('Bookmark with provided id does not exist');
		}

		// if collection id provided (and not null) check its existence
		if(collectionId) {
			const collectionExists = await CollectionService.exists({ _id: collectionId, userId: user.id });
			// if collection does not exist in user account
			if(!collectionExists) {
				throw ApiError.BadRequest('Collection with provided id does not exist');
			}
		}

		// updating bookmark in db
		const updatedBookmark = await BookmarkService.updateBookmarkById(bookmarkId, {
			collectionId, title, description, imgSrc
		});

		res.json(updatedBookmark);
	}
	catch(err) {
		respondWithError(err, res);
	}
};


module.exports = updateBookmark;