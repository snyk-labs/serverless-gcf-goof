'use strict';

module.exports = (req, res) => {

  console.log("Performing Restore");

  // create a response
  const response = {
    statusCode: 200,
    body: "Restore Complete",
  };
  callback(null, response);
};
