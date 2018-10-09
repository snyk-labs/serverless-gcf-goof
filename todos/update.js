'use strict';

const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT });
const kind = 'Todo';

module.exports = (req, res) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(req.body);

  // validation
  if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t update the todo item.'));
    return;
  }

  const todoId = req.params.todoId;

  const todoKey = datastore.key([kind, todoId]);
  let todoData;

  // update the todo in the database
  datastore
    .get(todoKey)
    .then(results => {
      todoData = results[0];
      todoData.text =  data.text;
      todoData.checked = data.checked;
      todoData.updatedAt = timestamp;

      return datastore.update({ key: todoKey, data: todoData});
    })
    .then(() => {
      // create a response
      res.status(200).json(todoData);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Couldn\'t update the todo item.');
    });
};
