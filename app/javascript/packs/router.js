// @ts-check

const host = '';

const prefix = 'api/v1';

export default {
  getData: () => [host, prefix, 'todos.json'].join('/'),
  create: () => [host, prefix, 'todos.json'].join('/'),
  delete: (id) => [host, prefix, 'todos', id].join('/'),
  update: (id) => [host, prefix, 'todos', id].join('/'),
  getComments: () => [host, prefix, 'comments.json'].join('/'),
  createComment: (todo_id) => [host, prefix, 'todos', todo_id, 'comments.json'].join('/'),
  signUp: () => [host, prefix, 'auth'].join('/'),
  session: () => [host, prefix, 'session'].join('/'),
}