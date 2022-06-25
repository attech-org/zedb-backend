# Backend for project ZEDB #
## How to start ##
1) Create file .env with next content:

```
URL_STRING_DATABASE="take url for database"
PORT="local port your http server"
JWT_SECRET="any key what you want"
```

2) Create user by post `/users/auth/signup`
    * Necessary fields are 'userName', 'password', 'name'. 
    * You can also use 'email', 'phone', 'avatar'. 
    * All fields are 'string'. 
    * After that you get response, and body of response have 'token'. You need to add this token in Headers parametr 'Authorization'

3) You can delete or change user whose token you use. 
## rest api ##
* post: `/users/auth/login` - authorization user(in body {"userName":"",password:""} or Headers['Authorization'] = `Google ${googleIdTokenUser}`) result JSON {userInDataBase:{}, token:"someToken"}
* post: `/users/auth/signup` - register new user
* get: `/users/` - list of users
* get: `/users/id` - get user by id
* post: `/users/` - create user
* put: `/users/id` - change user by id
* delete: `/users/id` - delete user by id
