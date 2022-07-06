# LOGIN API (AUTHENTICATOR)

[![Twitter Follow](https://img.shields.io/twitter/follow/far_is_man?style=flat-square)](https://twitter.com/far_is_man)
[![Node](https://img.shields.io/badge/nodejs-%3E%3D16.5.5-brightgreen?style=flat-square&logo=Node.js&logoColor=white)](https://nodejs.org/en/)

---

## :books: Description

This API is use for authenticating user then validate the role and verify the token.
Before each request you can get the token in here, and the session will storage in
Redis. For testing you can use this credential below

### **Credentials**

| USERNAME | PASSWORD | DESCRIPTION    |
| -------- | -------- | -------------- |
| admin    | admin    | For Admin rule |
| user     | user     | For Admin rule |

### **Spesification**

- bcryptjs: "^2.4.3",
- cors: "^2.8.5",
- crypto-js: "^4.1.1",
- dotenv: "^16.0.1",
- express: "^4.18.1",
- ioredis: "^5.1.0",
- jest: "^28.1.1",
- joi: "^17.6.0",
- knex: "^2.1.0",
- mysql2: "^2.3.3",
- pino: "^8.0.0",
- supertest: "^6.2.3"

---

## :building_construction: Installation

### **Developing**

If you want to developing this API, you can run :

```bash
npm run i -f -D

```

to install all dependencies and devDependencies then ignore the `package-lock.json`.
So we use the latest version of libraries that more stable than this API built before.

### **Deployment**

## :factory: API

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

## :statue_of_liberty: License

THIS IS FREE TO USE!!

Please do anything you want with this repo

