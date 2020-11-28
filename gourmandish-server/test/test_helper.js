const mongoose = require('mongoose');
const configDb = require("../config/database");

mongoose.Promise = global.Promise;


// TODO: check why the tests are using the main database and not the test database
before((done) => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: true,
    };
    //const mongoUri = 'mongodb://localhost/gourmandish_test';
    const mongoUri = `mongodb://${configDb.mongo.user}:${configDb.mongo.pw}@${configDb.mongo.host}:${configDb.mongo.port}/` + `${configDb.mongo.dbTest}`;
    console.log(mongoUri);
    mongoose.connect(mongoUri, options);
    mongoose.connection
        .once('open', () => { console.log('Connected to MongoDB test'), done(); })
        .on('error', (error) => {
            console.warn('Warning', error);
        });
});

beforeEach((done) => {
    const { users } = mongoose.connection.collections;
    users.drop(() => {
        done();
    });
});