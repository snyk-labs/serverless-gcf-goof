'use strict';

const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT });
const kind = 'Todo';

module.exports = (req, res) => {
  const todoId = req.params.todoId;

  const todoKey = datastore.key([kind, todoId]);

  // fetch todo from the database
  datastore
    .get(todoKey)
    .then(results => {
      // create a response
      res.status(200).json(results[0]);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Couldn\'t fetch the todo item.');
    });
};
