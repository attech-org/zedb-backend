# Backend for project ZEDB #
## How to start ##
1) Create file .env
2) Fill 
URL_STRING_DATABASE="take url for database"
PORT_HTTP="local port your http server"
Now base present in net on MongoDb resurse
3) For any connectin must be present Headers parametr Authorization: admin and Content-Type: application/json
## rest api ##
get: host:port/users/ - list of users
get: host:port/users/id - get user by id
post: host:port/users/ - add user
put: host:port/users/id - change user by id
delete: host:port/users/id - delete user by id
