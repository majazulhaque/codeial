const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/codeial_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error while connecting to db'));

db.once('open', function(err){
    if(err){console.log('Error while opening the db'); return;}

    console.log('Connected to the db :: mongoDB');
})

module.exports =db;