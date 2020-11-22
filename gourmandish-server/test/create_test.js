const assert = require('assert');
const request = require('supertest');
const app = require('../app');
const User = require('../models/user');

describe('Creating records', () => {
    it('saves a user', (done) => { // done() - to wait and continue the execution when everything is done
        User.count().then(count => {
            request(app) // fake http req
                .post('/api/users')
                .send({ email: 'test@test.com' })
                .end(() => {
                    User.count().then(newCount => {
                        assert(count + 1 === newCount);
                        done();
                    });
                });
        }); // .catch(done)
    });

});