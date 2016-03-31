const pg = require('pg');
const uuid = require('uuid')

//pg.defaults.ssl = true;

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

        callback(results.rows.length > 0);
      }
    );
  });
};

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

        callback(newUuid);
      }
    );
  });
};

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
          callback(results.rowCount);
        }
      }
    );
  });
};

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
          callback(results.rowCount);
        }
      }
    );
  });
};

