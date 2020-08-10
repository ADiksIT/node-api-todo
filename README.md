# node-api-todo
REST API service on node.js for to-do application


# AUTH
post: /register_login;
body: login, password;

# TODOS
 get: /users/:id/delete/:idtodo;
params: id, idtodo;
overview: delete todo by id

get: /users/:id;
params: id;
overview: return all todos user;

post: /users/:id
body: completed, id, text;
params: id
overview: add todo;

post: /users/:id/change/:idtodo;
body: completed, text;
params: id, idtodo;
overview: change todo by id


