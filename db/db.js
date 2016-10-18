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


exports.listUsers = (callback) => {
    pool.connect(function(err, client, done) {
      if (err) throw err;

      client.query({
          "text": "SELECT id,user_name FROM users WHERE active=true",
          "name": "listUsers"},
          function(err, results){
              done();

              if (err) throw err;

              process.nextTick(callback, results.rows);
          });
    });
};

exports.listGamesSpecifyInProgress = (userId, inProgressOnly, limit, callback) => {
    _listGames({
        "text": "SELECT id,in_progress,start_time,end_time,min_level,max_level FROM games WHERE user_id=$1 AND in_progress=$2 LIMIT " + limit,
        "name": "listGamesInProgressSpecified",
        "values": [userId,inProgressOnly]},
        callback);
};

exports.listGames = (userId, limit, callback) => {
    _listGames({
        "text": "SELECT id,in_progress,start_time,end_time,min_level,max_level FROM games WHERE user_id=$1 LIMIT " + limit,
        "name": "listGames",
        "values": [userId]},
        callback);
};

function _listGames(cfg, callback) {
    pool.connect(function(err, client, done) {
      if (err) throw err;

      client.query(cfg,
          function(err, results){
              done();

              if (err) throw err;

              process.nextTick(callback, results.rows);
      });
    });
};

exports.addGame = (userId, minLevel, maxLevel, callback) => {
    pool.connect(function(err, client, done) {
      if (err) throw err;

      const newGameId = uuid.v4();

      client.query({
          "text": "INSERT INTO games(id, user_id, in_progress, start_time, min_level, max_level) VALUES ($1, $2, true, now(), $3, $4);",
          "name": "addGame",
          "values": [newGameId, userId, minLevel, maxLevel]},
          function(err, results){
              done();

              if (err) throw err;

              process.nextTick(_addGameWords, newGameId, minLevel, maxLevel, callback);
      });
    });
};

function _addGameWords(gameId, minLevel, maxLevel, callback) {
    pool.connect(function(err, client, done) {
        if (err) throw err;

        client.query({
            "text": "INSERT INTO games_words(game_id, word_id, status, attempts, elapsed_time) (SELECT $1, id, '', 0, 0 FROM words WHERE difficulty >= $2 AND difficulty <= $3);",
            "name": "addGameWords",
            "values": [gameId, minLevel, maxLevel]},
            function(err, results){
                done();

                if (err) throw err;

                process.nextTick(callback, gameId);
        });
    });
};

exports.getGame = (gameId, callback) => {
    pool.connect(function(err, client, done) {
    if (err) throw err;

    client.query({
        "text": "SELECT id, user_id, in_progress, start_time, end_time, min_level, max_level FROM games WHERE id=$1;",
        "name": "getGame",
        "values": [gameId]},
        function(err, results){
            done();

            if (err) throw err;

            //TODO handle empty results
            process.nextTick(_getGameWords, gameId, results.rows[0], callback);
        });
    });
};

function _getGameWords(gameId, data, callback) {
    pool.connect(function(err, client, done) {
    if (err) throw err;

    client.query({
        "text": "SELECT gw.game_id, gw.word_id, gw.status, gw.attempts, gw.elapsed_time, w.word FROM games_words gw INNER JOIN words w ON w.id = gw.word_id WHERE gw.game_id=$1;",
        "name": "getGameWords",
        "values": [gameId]},
        function(err, results){
            done();

            if (err) throw err;

            data.words = results.rows;
            process.nextTick(callback, data);
        });
    });
};

exports.updateGameWord = (gameId, wordId, status, attempts, elapsed_time, callback) => {
    pool.connect(function(err, client, done) {
        if (err) throw err;

        client.query({
            "text": "UPDATE games_words SET status=$3, attempts=$4, elapsed_time=$5 WHERE game_id=$1 and word_id=$2;",
            "name": "updateGameWords",
            "values": [gameId, wordId, status, attempts, elapsed_time]},
            function(err, results){
                done();

                if (err) throw err;

                process.nextTick(callback, true);
        });
    });
};
