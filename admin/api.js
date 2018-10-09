'use strict';

// const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const AWS = {
  Lambda: function () {
    this.invoke = (data, fn) => {
      fn(null, { Payload: 'it worked' });
    };
  },
};
const qs = require('qs');

const adminSecret = "ea29cbdb-a562-442a-8cc2-adbc6081d67c";

module.exports = (req, res) => {
  if (!req.query ||
    !req.query.secret ||
    req.query.secret != adminSecret) {
      // Return an unauthorized response
      res.status(401).send("Invalid admin token");
    }

    // We're authorised, let's call the admin action
    var lambda = new AWS.Lambda();

    // Choose the action to perform
    var action = String(req.path).split('/').pop();
    var funcName = "serverless-goof-dev-internalBackup";
    if (action == "restore") {
      funcName = "serverless-goof-dev-internalRestore";
    }
    // Invoke it!
    console.log("invoking " + funcName);
    lambda.invoke({
      FunctionName: funcName,
      Payload: JSON.stringify(req.body, null, 2) // pass params
    }, function(error, data) {
      if (error) {
        console.log("Got error on invoke of " + funcName + " : " +
        JSON.stringify(error));
        res.status(500).json(error);
      }
      else if(data && data.Payload){
        console.log("Successfully invoked " + funcName);
        res.status(200).send("API call Complete");
      }
    } );
  }
