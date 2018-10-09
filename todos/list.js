'use strict';

const Datastore = require('@google-cloud/datastore');

const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT });

// matches the "kind" in ./create.js
const kind = 'Todo';
const allTodos = datastore.createQuery(kind).order('createdAt');

module.exports= (req, res) => {
  // fetch all todos from the database
  datastore
    .runQuery(allTodos)
    .then(results => {
      res.status(200).json(results[0]);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Couldn\'t fetch the todos.');
    });
};
