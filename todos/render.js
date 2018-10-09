'use strict';

const Datastore = require('@google-cloud/datastore');
const fs = require('fs');
// const qs = require('qs');
const dust = require('dustjs-helpers');

const datastore = new Datastore({ projectId: process.env.GCLOUD_PROJECT });
const kind = 'Todo';
const allTodos = datastore.createQuery(kind).order('createdAt');

module.exports = (req, res) => {

  // fetch all todos from the database
  datastore
    .runQuery(allTodos)
    .then(results => {
      const allTodos = results[0];

      // For no good reason, write results to a temp files
      fs.writeFile("/tmp/goof-todos-render." + Math.random(),JSON.stringify(allTodos));

      var templateFile = './todos/render.dust';
      return new Promise((resolve, reject) => {
        fs.readFile(templateFile, function(err, data) {
          if (err) {
            const error = new Error("Error 404");
            error.code = 404;
            reject(error);
          } else {
            // Interpret the EJS template server side to produce HTML content
            console.log("data:" + JSON.stringify(allTodos));
            // Prepare the dust template (really should be stored ahead of time...)
            var compiled = dust.compile(data.toString(), "dustTemplate");
            dust.loadSource(compiled);

            // Parse the query string
            // var params = qs.parse(req.query); // GCF does this already
            var params = req.query;
            console.log("Parsed parameters: " + JSON.stringify(params));
            // Invoke the template
            dust.render("dustTemplate",
              {
                title: 'Goof TODO',
                subhead: 'Vulnerabilities at their best',
                device: params.device,
                todos: allTodos
              },
              function(error, html) {
                  if (error) {
                    console.error(error);
                    reject(error);
                  } else {
                    res.status(200).send(html);
                    resolve();
                  }
              } );
          }
        });
      });
    })
    .catch(error => {
      // handle potential errors
      console.error(error);
      res.status(error.code || 500).send('Couldn\'t fetch the todos.');
    });
};
