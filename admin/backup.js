'use strict';

module.exports = (req, res) => {

  console.log("Performing Backup");

  // create a response
  const response = {
    statusCode: 200,
    body: "Backup Complete",
  };
  callback(null, response);
};
