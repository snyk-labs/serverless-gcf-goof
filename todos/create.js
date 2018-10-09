'use strict';

const uuid = require('uuid');
const hms = require('humanize-ms');
const ms = require('ms');
const fs = require('fs');
const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT });
const kind = 'Todo';

module.exports = (req, res) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(req.body);
  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    req.status(400).send('Couldn\'t create the todo item.');
    return;
  }

  var todoTxt = parse(data.text);

  // For no good reason, write results to a temp files
  fs.writeFile("/tmp/goof-todos-create." + Math.random(),todoTxt);

  // write the todo to the database
  const todoId = uuid.v1();
  const todoKey = datastore.key([kind, todoId]);

  // Prepares the new todo entity
  const params = {
    key: todoKey,
    data: {
      id: todoId,
      text: todoTxt,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  datastore
    .insert(params)
    .then(() => {
      // create a response
      res.status(200).json(params.data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Couldn\'t create the todo item.');
    });
};

function parse(todo) {
  var t = todo;

  var remindToken = ' in ';
  var reminder = t.toString().indexOf(remindToken);
  if (reminder > 0) {
    var time = t.slice(reminder + remindToken.length);
    time = time.replace(/\n$/, '');

    var period = hms(time);

    console.log('period: ' + period);

    // remove it
    t = t.slice(0, reminder);
    if (typeof period != 'undefined') {
      t += ' [' + ms(period) + ']';
    }
  }
  return t;
}
