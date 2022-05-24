const nock = require('nock');

describe('#API-Calls-Test', function () {
    beforeEach(function () {
        nock('https://ba-2021.herokuapp.com/api/')
            .get('projects')
            .reply(200, {
                message: 'api/projects -> Ok'
            })
    })
    it('tests api reachabitlity', function () {
        var test = new this.test();
    })
})