'use strict';

const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT });
const kind = 'Todo';

module.exports = (req, res) => {
  const todoId = req.params.todoId;

  const todoKey = datastore.key([kind, todoId]);

  // delete the todo from the database
  datastore
    .delete(todoKey)
    .then(() => {
      // create a response
      res.status(200).json({});
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Couldn\'t remove the todo item.');
    });
};
