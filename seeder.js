const seeder = require('mongoose-seed')
const keys = require('./keys');

const db = keys.mongoURI;

seeder.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true }, function () {
    seeder.loadModels([
        './config/models/project.js'
    ]);
    seeder.clearModels(['project']);
    seeder.populateModels(data, function (err, done) {
        if(err) {
            return console.log("seed err", err)
        }
        if (done) {
            return console.log("seed done", done);
        }
        seeder.disconnect()
    })
})

const data = [
    {
    'model': 'project',
    'documents': [
        { 
            'name': 'BA - Projekt', 
            'id': '1', 
            'githubURL': 'https://github.com/leandergebhardti8/ba-2021.git', 
            'repoOwner': 'leandergebhardti8', 
            'repoName': 'ba-2021', 
            'githubToken': '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', 
            'deployMethods': [
              {
                'name': 'Heroku',
                'environments': [
                  {
                    'name': 'Heroku', 
                    'action': 'run-deploy', 
                    'id': '1', 
                    'url': 'https://ba-2021.herokuapp.com/', 
                    'builds': ["07.03.2021 11:12:40"]
                  }, 
                  {
                    'name': 'Dev', 
                    'action': 'Dev Deploy', 
                    'id': '2'
                  }
                ],
              }
            ], 
            },
            { 
              'name': 'ExampleName', 
              'id': '2', 
              'githubURL': 'test.test.test.git',
              'epoOwner': '', 
              'repoName': '', 
              'githubToken': '', 
              'deployMethods': [
                {
                  'name': 'S3',
                  'environments': [],
                }
              ] 
            },
    ]
    }
]