const pathToRegexp = require('path-to-regexp');

const list = require('./list');
const create = require('./create');

const get = require('./get');
const update = require('./update');
const del = require('./delete');
const render = require('./render');

const routingRegexp = pathToRegexp('/:todoId?');

// this routing stuff is pretty horrendous, but its what Google's docs say to do
module.exports = (req, res) => {
  const [_, todoId] = (routingRegexp.exec(req.path) || []);
  req.params = { todoId };

  switch (req.method) {
    case 'GET':
      if (todoId) {
        if (todoId === 'render') {
          render(req, res);
        } else {
          get(req, res);
        }
      } else {
        list(req, res);
      }
      return;

    case 'POST':
      if (todoId) {
        break; // POST with a todoId is not supported
      }
      create(req, res);
      return;

    case 'PUT':
      if (todoId) {
        update(req, res);
        return;
      }
      break;

    case 'DELETE':
      if (todoId) {
        del(req, res);
        return;
      }
      break;
  }

  res.status(404).send();
};
