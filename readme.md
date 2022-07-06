# NODE JS TEMPLATE [![GitHub package.json version](https://img.shields.io/github/package-json/v/salmanthoriq95/simple-crud-cjs?style=for-the-badge)](https://github.com/salmanthoriq95/simple-crud-cjs)

[![Twitter Follow](https://img.shields.io/twitter/follow/far_is_man?style=flat-square)](https://twitter.com/far_is_man)
[![GitHub last commit](https://img.shields.io/github/last-commit/salmanthoriq95/simple-crud-cjs?style=flat-square)](https://github.com/salmanthoriq95/simple-crud-cjs/graphs/commit-activity)
[![Node](https://img.shields.io/badge/nodejs-%3E%3D16.5.5-brightgreen?style=flat-square&logo=JavaScript)](https://nodejs.org/en/)
[![CodeFactor](https://www.codefactor.io/repository/github/salmanthoriq95/simple-crud-cjs/badge?style=flat-square)](https://www.codefactor.io/repository/github/salmanthoriq95/simple-crud-cjs)

---

## :books: Description

This is simple CRUD API built using NodeJs, MySQL, and Express with Authenticator.
I created with CommonJs style, because ESM is still experimentall in NodeJs.
So, because ESM is the future of javascript, I will create ESM template
using AirBnB EsLint configuration. And hope ESM will stable soon in NodeJs.

If you used to use Postman for creating request to your API,
you can import my collections that store in the root in every folders.

You can use it as template and modify as you need for your project.
Feel free to discuss or suggest new improvement for better template

My goal is we can create an API without any library or dependencies,
so we will focus about what will we create without read other
libraries documentation.

Thank You,

Salman Thoriq Al Farisyi

### **Credentials**

| USERNAME | PASSWORD | DESCRIPTION    |
| -------- | -------- | -------------- |
| admin    | admin    | For Admin rule |
| user     | user     | For Admin rule |

### Specification

- NodeJs
- ExpressJs as framewordk
- Jest and Supertest as unit test
- MySQL build by Knex as database query
- Redis using for session management
- pino for logger
- joi for validating input
- bcrypt for hashing password
- axios for fetching into other api

---

## :building_construction: Installation

If you use windows and want to build into docker for the whole API you can use this command to build all api,

```bash
npm run build:win
```

## :factory: API

## Login

This is available end point for this API

| METHOD                   | END POINT                 | DESCRIPTION          |
| ------------------------ | ------------------------- | -------------------- |
| [POST](#post-login)      | [/login](#post-login)     | Create new user data |
| [DELETE](#delete-logout) | [/logout](#delete-logout) | Delete a user data   |
| [GET](#get-session)      | [/session](#get-session)  | Delete a user data   |

### **POST _/login_**

This end point is use to get token and key that will pass into request header for every request we'll make, and the token will store in redis for 24 hours. For default credential please check [credentials](#credentials)

#### **End Point**

| METHOD | END POINT | DESCRIPTION           |
| ------ | --------- | --------------------- |
| POST   | /login    | Login with credential |

#### **Body Payload**

| KEY      | DATA TYPE | REQUIRED                        | DESCRIPTION                             |
| -------- | --------- | ------------------------------- | --------------------------------------- |
| username | string    | :ballot_box_with_check: **YES** | can fill with username or email of user |
| password | string    | :ballot_box_with_check: **YES** | password of user                        |

example:

```json
{
	"username": "admin",
	"password": "admin"
}
```

#### **Example 200 (_OK_)**

```json
{
	"success": true,
	"message": "Login successful!"
}
```

#### **Example 422 (_Unauthorized_)**

```json
{
	"name": "HttpExpection",
	"message": "Login Failed! Invalid Username or Password",
	"success": false
}
```

### **DELETE _/logout_**

This end point delete all session stored in redis.

#### **End Point**

| METHOD | END POINT | DESCRIPTION          |
| ------ | --------- | -------------------- |
| DELETE | /logout   | destroy your session |

#### **Example 200 (_OK_)**

```json
{
	"success": true,
	"message": "Logout successful!"
}
```

### **GET _/session_**

Check session of user, check token that passed inside headers

#### **End Point**

| METHOD | END POINT | DESCRIPTION                       |
| ------ | --------- | --------------------------------- |
| GET    | /session  | check token passed inside headers |

#### **Example 200 (_OK_)**

```json
{
	"success": true,
	"message": "Session successful!",
	"data": {
		"id": 1,
		"isAdmin": 1
	}
}
```

## Users

This is available end point for users API

| METHOD            | END POINT             | DESCRIPTION          |
| ----------------- | --------------------- | -------------------- |
| [GET](#get)       | [/users/:id?](#get)   | Get user data        |
| [POST](#post)     | [/users](#post)       | Create new user data |
| [PUT](#put)       | [/users/:id](#put)    | Update user data     |
| [DELETE](#delete) | [/users/:id](#delete) | Delete a user data   |

### GET

This End Point is use for get all data of users or singkle data when you pass the user's Id.
if you are admin you can get all data of users, but if you just an user, you only can
get your own data.

#### **End Point**

| METHOD | END POINT   | DESCRIPTION                           |
| ------ | ----------- | ------------------------------------- |
| GET    | /users/:id? | Passing Id if you use user credential |

#### **Example 200 (_OK_)**

```json
{
	"success": true,
	"message": "success get data",
	"data": [
		{
			"id": 1,
			"username": "admin",
			"isAdmin": 1,
			"email": "admin@admin.com",
			"password": "$2a$12$WVE1eY6NLs/zbC0.gGgV7uLSf.yGerJgmeycDmzX75VWiMoPFM/1a"
		},
		{
			"id": 2,
			"username": "user",
			"isAdmin": 0,
			"email": "user@user.com",
			"password": "$2a$12$qDrWAwyfPwu3hhLC0xQmy.zT.UMLYfoTH8vCOdY8ZNrPGbl26LQsC"
		},
		{
			"id": 3,
			"username": "salman",
			"isAdmin": 1,
			"email": "salman@admin.com",
			"password": "$2a$12$6DAh3vdQapI3lXYMd8hDTOm8AZs2Lj.gC7uvdfVAKBjnT4rmO9nAO"
		}
	]
}
```

#### **Example 401 (_Unauthorized_)**

```json
{
	"success": false,
	"name": "HttpExpection",
	"message": "Access denied!"
}
```

### POST

This end Point is use for create new user data. Only admin can access it.

#### **End Point**

| METHOD | END POINT | DESCRIPTION             |
| ------ | --------- | ----------------------- |
| POST   | /users/   | Create new data of user |

#### **Body Payload**

| KEY      | DATA TYPE | REQUIRED                        | DESCRIPTION      |
| -------- | --------- | ------------------------------- | ---------------- |
| username | string    | :ballot_box_with_check: **YES** | username of user |
| isAdmin  | boolean   | :ballot_box_with_check: **YES** | role of user     |
| email    | string    | :ballot_box_with_check: **YES** | email of user    |
| password | string    | :ballot_box_with_check: **YES** | password of user |

example:

```json
{
	"username": "salman",
	"isAdmin": true,
	"email": "salman@admin.com",
	"password": "asdf1234*"
}
```

#### **Example 200 (_OK_)**

```json
{
	"success": true,
	"message": "success add data"
}
```

#### **Example 401 (_Unauthorized_)**

```json
{
	"success": false,
	"name": "HttpExpection",
	"message": "Access denied!"
}
```

### PUT

This end point is use for updating a data of user, only admin can access it.

#### **End Point**

| METHOD | END POINT  | DESCRIPTION           |
| ------ | ---------- | --------------------- |
| PUT    | /users/:id | Updating data of user |

#### **Params Payload**

| KEY | DATA TYPE | REQUIRED                        | DESCRIPTION |
| --- | --------- | ------------------------------- | ----------- |
| :id | number    | :ballot_box_with_check: **YES** | id of user  |

example:

```
/users/3
```

#### **Body Payload**

| KEY      | DATA TYPE | REQUIRED                        | DESCRIPTION      |
| -------- | --------- | ------------------------------- | ---------------- |
| username | string    | :ballot_box_with_check: **YES** | username of user |
| isAdmin  | boolean   | :ballot_box_with_check: **YES** | role of user     |
| email    | string    | :ballot_box_with_check: **YES** | email of user    |
| password | string    | :ballot_box_with_check: **YES** | password of user |

example:

```json
{
	"username": "salman",
	"isAdmin": true,
	"email": "salman@admin.com",
	"password": "asdf1234*"
}
```

#### **Example 200 (_OK_)**

```json
{
	"success": true,
	"message": "success edit data"
}
```

#### **Example 401 (_Unauthorized_)**

```json
{
	"success": false,
	"name": "HttpExpection",
	"message": "Access denied!"
}
```

### DELETE

This end point is use for deleting a data of users, only admin can access it.

#### **End Point**

| METHOD | END POINT  | DESCRIPTION           |
| ------ | ---------- | --------------------- |
| DELETE | /users/:id | Deleting data of user |

#### **Params Payload**

| KEY | DATA TYPE | REQUIRED                        | DESCRIPTION |
| --- | --------- | ------------------------------- | ----------- |
| :id | number    | :ballot_box_with_check: **YES** | id of user  |

example:

```
/users/3
```

#### **Example 200 (_OK_)**

```json
{
	"success": true,
	"message": "success delete data"
}
```

#### **Example 401 (_Unauthorized_)**

```json
{
	"success": false,
	"name": "HttpExpection",
	"message": "Access denied!"
}
```

## :statue_of_liberty: License

THIS IS FREE TO USE!!

Please do anything you want with this repo
