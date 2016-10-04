const pg = require('pg');
const uuid = require('uuid')
const url = require('url');

const dbConfig = {"ssl": true};
if(!process.env.DATABASE_URL){
    process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:5432/jasonmfehr';
    dbConfig.ssl = false;
}
const dbUrlParms = url.parse(process.env.DATABASE_URL);
const dbAuth = dbUrlParms.auth.split(':');
dbConfig.user = dbAuth[0];
dbConfig.password =dbAuth[1];
dbConfig.host = dbUrlParms.hostname;
dbConfig.port = dbUrlParms.port;
dbConfig.database = dbUrlParms.pathname.split('/')[1];
const pool = new pg.Pool(dbConfig);

exports.getWords = (grade,minLevel,maxLevel,callback) => {
    pool.connect(function(err, client, done) {
      if (err) throw err;

      client.query(
          'SELECT id,word,do_transform AS dotransform FROM public.words WHERE grade=$1 AND difficulty>=$2 AND difficulty<=$3;',
          [grade, minLevel, maxLevel],
          function(err, results){
              done();

              if (err) throw err;

              process.nextTick(callback, results.rows);
          });
    });
};

//TODO switch to using pg-pool
exports.listUsers = (callback) => {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    client.query(
      {
        name: 'list users',
        text: 'SELECT id,user_name FROM users;'
      },
      function(err, results){
        if (err) throw err;

        done();

        process.nextTick(callback, results.rows);
      }
    );
  });
};

//TODO switch to using pg-pool
exports.getUserAndPeople = (userId, callback) => {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    client.query(
      {
        name: 'get user and people',
        text: 'SELECT u.id AS user_id, u.user_name, p.id AS person_id, p.person_name, p.grade, p.min_level, p.max_level FROM public.users u INNER JOIN public.people p ON u.id = p.user_id WHERE u.id=$1;',
        values: [userId]
      },
      function(err, results){
        if (err) throw err;

        done();

        var res = {};
        if(results.rows.length > 0){
          res.id = results.rows[0].user_id
          res.userName = results.rows[0].user_name;
          res.people = new Array();
          results.rows.forEach((element) => {
            res.people.push({
              "id": element.person_id,
              "name": element.person_name,
              "grade": element.grade,
              "minLevel": element.min_level,
              "maxLevel": element.max_level
            });
          });
        }

        process.nextTick(callback, res);
      }
    );
  });
};

//TODO switch to using pg-pool
exports.getGames = (personId, callback) => {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    client.query(
      {
        name: 'get games for person',
        text: 'SELECT id, person_data, start_time, end_time FROM public.people_data WHERE person_id=$1;',
        values: [personId]
      },
      function(err, results){
        if (err) throw err;

        done();

        var games = new Array();
        results.rows.forEach((element) => {
          games.push({
            "id": element.id,
            "data": element.person_data,
            "startTime": element.start_time,
            "endTime": element.end_time
          });
        });

        process.nextTick(callback, games);
      }
    );
  });
};

/*
//TODO switch to using pg-pool
exports.hasInProgressGame = (personId, callback) => {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    client.query(
      {
        name: 'check for in progress',
        text: 'SELECT id FROM people_data WHERE person_id=$1 AND end_time IS NULL;',
        values: [personId]
      },
      function(err, results){
        if (err) throw err;

        done();

        process.nextTick(callback, results.rows.length > 0);
      }
    );
  });
};
*/

//TODO switch to using pg-pool
exports.getInProgressGame = (personId, callback) => {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    client.query(
      {
        name: 'get in progress',
        text: 'SELECT id, person_data, start_time FROM people_data WHERE person_id=$1 AND end_time IS NULL ORDER BY start_time DESC LIMIT 1;',
        values: [personId]
      },
      function(err, results){
        var result = {};

        if (err) throw err;

        done();

        if(results.rows.length === 1){
          result = results.rows[0];
        }

        process.nextTick(callback, result);
      }
    );
  });
};

//TODO switch to using pg-pool
exports.addGame = (personId, jsonData, callback) => {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    const newUuid = uuid.v4();

    client.query(
      {
        name: 'add game',
        text: 'INSERT INTO people_data (id,person_id,person_data) VALUES ($1,$2,$3);',
        values: [newUuid, personId, jsonData]
      },
      function(err, results){
        if (err) throw err;

        done();

        process.nextTick(callback, newUuid);
      }
    );
  });
};

//TODO switch to using pg-pool
exports.saveGame = (gameId, jsonData, callback) => {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    client.query(
      {
        name: 'save game',
        text: 'UPDATE people_data SET person_data=$1 WHERE id=$2;',
        values: [jsonData, gameId]
      },
      function(err, results){
        if (err) throw err;

        done();

        if(callback){
          process.nextTick(callback, results.rowCount);
        }
      }
    );
  });
};

//TODO switch to using pg-pool
exports.endGame = (gameId, callback) => {
   pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    client.query(
      {
        name: 'end game',
        text: 'UPDATE people_data SET end_time=now() WHERE id=$1;',
        values: [gameId]
      },
      function(err, results){
        if (err) throw err;

        done();

        if(callback){
          process.nextTick(callback, results.rowCount);
        }
      }
    );
  });
};
