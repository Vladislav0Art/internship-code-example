// models
const Collection = require('../db/models/datadocs/Collection');


class CollectionService {
	// creating ans saving new collection in db
	static createNewCollectionInDb = async ({
		userId, groupId, label, icon = ''
	}) => {
		// creating collection instance
		const collection = new Collection({
			userId, groupId, label, icon
		});
		
		// saving to db
		await collection.save();

		return collection;
	};

	// deleting collection from db
	static deleteCollectionById = collectionId => new Promise((resolve, reject) => {
		// finding collection and deleting it from db
		Collection.findByIdAndDelete(collectionId)
			.then(deletedCollection => resolve(deletedCollection))
			.catch(err => reject(err));
	});


	// deleting collections by group id
	static deleteCollectionsByGroupId = groupId => new Promise((resolve, reject) => {
		// sorting collections by group id and deleting them in db 
		Collection.deleteMany({ groupId })
			.then(deletedCount => resolve(deletedCount))
			.catch(err => reject(err));
	});

	
	// deleting empty collection (which contains 0 bookmarks) by group id
	static deleteEmptyCollectionsByGroupId = groupId => new Promise((resolve, reject) => {
		// deleting collection with provided group id and with 0 bookmarks count
		Collection.deleteMany({ groupId, bookmarksCount: 0 })
			.then(deletedCount => resolve(deletedCount))
			.catch(err => reject(err));
	}); 


	// updating collection by id and omitting undefined values
	static updateCollectionById = (collectionId, updateOptions) => new Promise((resolve, reject) => {
		// searching collection by id and updating in db
		Collection.findByIdAndUpdate(collectionId, updateOptions, {
			runValidators: true,
			omitUndefined: true,
			new: true,
		})
			.then(collection => resolve(collection))
			.catch(err => reject(err));
	});


	// checking existence of collection with provided matching query
	static exists = (query) => new Promise((resolve, reject) => {
		Collection.exists(query)
			.then(existence => resolve(existence))
			.catch(err => reject(err));
	});


	// retrieving collections by user id
	static findCollectionsByUserId = (userId) => new Promise((resolve, reject) => {
		Collection.find({ userId })
			.then(collections => resolve(collections))
			.catch(err => reject(err));
	});
};

module.exports = CollectionService;