const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cloudinary = require('cloudinary').v2;



// setting cloudinary config
cloudinary.config({
  cloud_name: config.cloudinaryConfig.cloud_name, 
  api_key:  config.cloudinaryConfig.api_key, 
  api_secret:  config.cloudinaryConfig.api_secret 
});


// connect to db
const db = config.get('MongoURI');

// connecting MongoDB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('MongoDB connected...');
        
    // routes
    const users = require('./routes/users');
    const posts = require('./routes/api/posts');

    const app = express();


    // parsing middleware
    app.use(express.json());

    // including routes
    app.use('/users', users);
    app.use('/posts', posts);


    // starting server and listening to port
    const PORT = process.env.PORT || config.get('PORT');
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });

  })
  .catch(err => console.log(err));
