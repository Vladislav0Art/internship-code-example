const mongoose = require('mongoose');
const CustomError = require('../config/CustomError');
const queryLimit = require('../config/default.json').queryLimit;


// creates pagination system of requested model items
const createPaginationMiddleware = (model) => {
  // model is the mongoose model for making requests

  // returning middleware function
  return async (req, res, next) => {
    // query variables
    let page, name = '', labels = '';
    page = req.query.page;
    name = req.query.name || name;
    labels = req.query.labels || labels;

    try {
      page = parseInt(page); // parsing page value to integer
      if(labels.length !== 0) {
        labels = JSON.parse(labels); // decoding labels array
      }
    }
    catch(e) {
      return res.status(400).send(new CustomError(e.message, e.name));
    }

    // if page number was not passed in query ot it is NaN
    if(!page) {
      return res.status(400).send(new CustomError('Bad request!', 'ValidationError'));
      
    }


    // counting the docs of the model in db
    let documentsCount = 0;
    if(name !== '' && labels !== '') {
      documentsCount = await model
        .countDocuments({ $or: [
            { labels: { $all: labels } },
            { dishType: { $regex: name, $options: 'i' } }
          ] 
        }).exec();
    }
    else {
      documentsCount = await model.countDocuments().exec();
    }


    // starting index
    const startIndex = (page - 1) * queryLimit;
    // ending index
    const endIndex = page * queryLimit;
  
    // main object of the processed data
    const results = {};

    // setting docs count
    results.docsCount = documentsCount;
    // setting number of pages
    results.pagesCount = Math.ceil(documentsCount / queryLimit);

    // if end index less than docs count, then setting 'next' page property
    if(endIndex < documentsCount) {
      results.next = page + 1;
    }

    // if start index more than 0, then setting 'previous' page property
    if(startIndex > 0) {
      results.previous = page - 1;
    }

    try {
      // requesting the db
      if(name !== '' && labels !== '') {
        results.items = await model
          .find({ $or: [
              { labels: { $all: labels } },
              { dishType: { $regex: name, $options: 'i' } }
            ] 
          })
          .limit(queryLimit).skip(startIndex).exec();
      }
      else {
        results.items = await model.find().limit(queryLimit).skip(startIndex).exec();
      }

      // setting 'results' object to res property
      res.results = results;
      next();
    }
    catch(err) {
      return res.status(500).send(new CustomError(err.message, err.name));
    }
  };
};


module.exports = createPaginationMiddleware;