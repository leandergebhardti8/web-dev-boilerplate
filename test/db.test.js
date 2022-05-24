/* eslint-disable no-undef */
const mongoose = require('mongoose');
const keys = require('../config/keys');


describe("Database Tests", function() {
    describe('Connection to DB with mongoURI', function(){
        it('Connection to DB sucessfull', function(done){
            mongoose.connect(keys.mongoURI, {
                useNewUrlParser: true, 
                useUnifiedTopology: true, 
                useCreateIndex: true
            }, done);
        });
    })
    describe("Connection to DB with wrong mongoURI", function() {
        it('Connection to DB should fail', function(done){
            try{
                let connection = mongoose.connect('loclahost:3000', {
                    useNewUrlParser: true, 
                    useUnifiedTopology: true, 
                    useCreateIndex: true
                });
                expect(connection).to.throw(Error);
            }
            catch (error) {
                done()
            }
        })
    })
})