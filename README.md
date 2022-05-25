# Backend for project ZEDB #
## How to start ##
1) Create file .env
2) Fill .env:
URL_STRING_DATABASE="take url for database"
PORT_HTTP="local port your http server"
secretKeyJWT="any key what you want"
Now base present in net on MongoDb resurse
3) Create user by post host:port/users/ 
* Necessary fields are 'userName', 'password', 'name'. 
* You can also use 'email', 'phone', 'avatar'. 
* All fields are 'string'. 
* After that you get response, and body of response have 'token'. You need to add this token in Headers parametr 'Authorization'
4) You can delete or change user whose token you use. 
## rest api ##
* post: host:port/users/auth/login - authorization
* get: host:port/users/ - list of users
* get: host:port/users/id - get user by id
* post: host:port/users/ - create user
* put: host:port/users/id - change user by id
* delete: host:port/users/id - delete user by id
