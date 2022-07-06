# USERS CRUD

[![Twitter Follow](https://img.shields.io/twitter/follow/far_is_man?style=flat-square)](https://twitter.com/far_is_man)
[![Node](https://img.shields.io/badge/nodejs-%3E%3D16.5.5-brightgreen?style=flat-square&logo=Node.js&logoColor=white)](https://nodejs.org/en/)

---

## Description

This is directory for modifying all data in users table. for every request, the apps will validating role by the token which passed into headers request.

Please make sure that you passed the token and key into header for every request you created.
You can get token and key after you login with your credential.

If you used to use Postman you can import my collection in this root directory,
because I inputted a global variable into request header for every request we'll make.

### SPECIFICATION

- axios: "^0.27.2",
- bcryptjs: "^2.4.3",
- cors: "^2.8.5",
- dotenv: "^16.0.1",
- express: "^4.18.1",
- jest: "^28.1.1",
- joi: "^17.6.0",
- knex: "^2.1.0",
- mysql2: "^2.3.3",
- pino: "^8.0.0",
- supertest: "^6.2.3"

---

## Installation

### **Developing**

If you want to developing this API, you can run :

```bash
npm run i -f -D

```

to install all dependencies and devDependencies then ignore the `package-lock.json`.
So we use the latest version of libraries that more stable than this API built before.

### **Deployment**

## API

This is available end point for this API

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

## License

THIS IS FREE TO USE!!

Please do anything you want with this repo

