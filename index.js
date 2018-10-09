module.exports = {
  todos: require('./todos/api'),
  'todos-create': require('./todos/create.js'),
  'todos-list': require('./todos/list.js'),
  'todos-render': require('./todos/render.js'),

  'todos-get': require('./todos/api'),
  'todos-update': require('./todos/api'),
  'todos-delete': require('./todos/api'),

  'internal-backup': require('./admin/backup.js'),
  'internal-restore': require('./admin/restore.js'),
  admin: require('./admin/api'),
};
