const http = require('http');
const mysql = require('mysql');
const elasticsearch = require('elasticsearch');

const statuses = {};

const port = process.env.PORT || 3000;
const delay = process.env.DELAY || 3000;

schedule(checkMySQL);
schedule(checkElastic);

http.createServer(listener).listen(port,
  () => console.log(`Server is listening on ${port}`));

function listener(req, res) {
  var output = '';

  for (let service in statuses) output +=
    `<li>${service} is ${statuses[service] ? 'UP' : 'DOWN'}</li>`;

  res.end(`
    <!DOCTYPE html>
    <html>
      <body>
        <ul>${output}</ul>
      </body>
    </html>
  `);
}

function checkMySQL(callback) {
  const url = process.env.MYSQL;

  if (!url) return callback(new Error('Define MYSQL url'));

  const connection = mysql.createConnection(url);

  connection.on('error', err => callback(err));

  connection.ping((err, status) => {
    statuses.MySQL = !err && !!status;

    connection.destroy();

    callback(err);
  });
}

function checkElastic(callback) {
  const host = process.env.ELASTIC;

  if (!host) return callback(new Error('Define ELASTIC host'));

  const elastic = new elasticsearch.Client({ host });

  elastic.ping((err, status) => {
    statuses.Elastic = !err && status;

    callback(err);
  });
}

function schedule(fn) {
  fn(err => {
    if (err) console.error(err);

    setTimeout(schedule, delay, fn);
  });
}
