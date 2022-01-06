const mongoose = require('mongoose');
// models
const Group = require('../db/models/datadocs/Group');


class GroupService {
	// creating and saving in db group with provided label and user id
	static createNewGroupInDb = async (label, userId) => {
		// cerating group
		const group = new Group({ userId, label });
		// saving in db
		await group.save();

		return group;
	};

	// retrieving groups by user id
	static findGroupsByUserId = (userId) => new Promise((resolve, reject) => {
		Group.find({ userId })
			.then(groups => resolve(groups))
			.catch(err => reject(err));
	});


	// updating group by id
	static updateGroupById = (groupId, updateOptions) => new Promise((resolve, reject) => {
		// updating fields by id
		Group.findByIdAndUpdate(groupId, updateOptions, {
			runValidators: true,
			omitUndefined: true,
			new: true,
		})
			.then(group => resolve(group))
			.catch(err => reject(err));
	});

	// removing group from db (this action should invoke deletion of associated collections and bookmarks)
	static deleteGroupById = groupId => new Promise((resolve, reject) => {
		// finding by id and deleting from db
		Group.findByIdAndDelete(groupId)
			.then(deletedGroup => resolve(deletedGroup))
			.catch(err => reject(err));
	});
};


module.exports = GroupService;