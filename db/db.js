var pg = require('pg');

pg.defaults.ssl = true;
/*
pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});
*/

exports.listUsers = (callback) => {
  //pg.connect('postgres://postgres:postgres@localhost:5432/jasonmfehr', function(err, client, done) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    if (err) throw err;

    client.query('SELECT "id","user_name","grade","min_level","max_level" from users;', function(err, results){
      if (err) throw err;
      
      done();
      
      callback(results.rows);
    });
  });
}
