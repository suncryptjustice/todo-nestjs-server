<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  <h1>ToDo's NestJS Web Server</h1>
  <h2>NestJS + TypeORM + SQLite + Typescript</h2> 
</div>

## Description

This is simple server app maded with [NestJS](https://github.com/nestjs/nest) framework.

## Installation:

### 1. Clone reporsitory and install deps

---

```bash
$ git clone https://github.com/suncryptjustice/nestjs-todos-server.git my-server
$ cd my-server
$ yarn
```

<h3 id="env_setup">2. Create .env file in root directory that contains next variables:</h3>

---

```bash
# port address to run server, default is 3030
PORT=3000

# JWT secret for Passport functionality
JWT_ACCESS_TOKEN_SECRET=MyStrongNotBreakableKey

# JWT expiration time
JWT_ACCESS_TOKEN_EXPIRATION=24h

# Your database name
DB_NAME=my_sql_db
```

### 3. Run your app for the fist time to create SQLlite database in your project root directory.

---

```bash
$ yarn start: dev
```

### 4. Generate and run migration with typeorm

---

```bash
$ yarn migration:generate init_migration
$ yarn migration:run
```

## API

You can check all available api endpoints with [Swagger](`https://docs.nestjs.com/openapi/introduction`).
By default it's available on the next url while app is running: `http://localhost:`**PORT**`/api/`.

**Default PORT is 3000, but it can be change by [enviroment variables](#env_setup).**

If you want remove Swagger just go to main.ts and delete this part:

```ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// ...
const config = new DocumentBuilder()
  .setTitle('Tasks Server API')
  .setDescription(
    "Server created for education purposes. You can use it for your's educational projects",
  )
  .setVersion('1.0')
  .addBearerAuth(
    {
      description: `Please enter token in following format: Bearer <JWT>`,
      name: 'Authorization',
      bearerFormat: 'Bearer',
      scheme: 'Bearer',
      type: 'http',
      in: 'Header',
    },
    'access_token',
  )
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
```

Additionaly you can delete all Swagger Decorators from the app.

### Public Endpoints

---

1. <p id="login_endpoint" color="">Login</p>

```json
{
  "url": "/api/auth/login",
  "method": "POST",
  "payload": {
    "email": "some@email.com",
    "password": "helloharry"
  },
  "response": {
    "access_token": "SomeCoolToken"
  }
}
```

2. Create new user

```json
{
  "url": "/api/clients",
  "method": "POST",
  "payload": {
    "email": "some@email.com",
    "password": "helloharry"
  },
  "response": {
    "email": "some@email.com",
    "id": 69,
    "role": "client",
    "created_at": "2022-02-04T04:13:51.000Z",
    "updated_at": "2022-02-04T04:13:51.000Z"
  }
}
```

### Private Client Endpoints

---

Each request to private api point must include Authorization header which you can get in [Login method response](#login_endpoint).  
Example: `Authorization: Bearer <token>`

1. Create Task

```json
{
  "url": "/api/tasks",
  "method": "POST",
  "payload": {
    "title": "Meet with friends",
    "description": "Call everyone and invite them to the party"
  },
  "response": {
    "id": 69,
    "title": "Meet with friends",
    "description": "Call everyone and invite them to the party",
    "created_at": "2022-02-04T04:13:51.000Z",
    "updated_at": "2022-02-04T04:13:51.000Z"
  }
}
```

2. Get all tasks

```json
{
  "url": "/api/tasks",
  "method": "GET",
  "response": [
    {
      "id": 69,
      "title": "Meet with friends",
      "description": "Call everyone and invite them to the party",
      "created_at": "2022-02-04T04:13:51.000Z",
      "updated_at": "2022-02-04T04:13:51.000Z"
    }
    // ...rest
  ]
}
```

3. Update task

```json
{
  "url": "/api/tasks/:task_id",
  "method": "UPDATE",
  "payload": {
    "title?": "Meet with friends",
    "description?": "Call everyone and invite them to the party"
  },
  "response": {
    "title?": "Meet with friends",
    "description?": "Call everyone and invite them to the party",
    "updated_at": "2022-02-04T04:13:51.000Z"
  }
}
```

4. Delete task

```json
{
  "url": "/api/tasks/:task_id",
  "method": "DELETE",
  "response": {
    "status": 200,
    "message": "Task was deleted"
  }
}
```

### Private Admin Endpoints

---

For use this methods user must have `role` = `admin`.
If you not familiar with sql do following steps:

- Create user that you wanna make admin
- Open your database with some of the db clients. For example for SQLlite you can use some of [this]("https://www.sqlite.org/download").
- After you connect to database, just run this query:

```sql
UPDATE clients SET role = "admin" WHERE email = "your@email.com";
```

- Congratulations, you get the admin role.

After this you can access all admin enpoints.

1. Get Clients

```json
{
  "url": "/api/admin/clients",
  "queryParams": {
    "email": "some@email.com", //Email filter
    "role": "client", // Role filter
    "limit": 100, // How many clients retrive from db
    "skip": 0 // How many clients skip before retrive from db
  },
  "method": "GET",
  "response": [
    {
      "email": "some@email.com",
      "id": 69,
      "role": "client",
      "created_at": "2022-02-04T04:13:51.000Z",
      "updated_at": "2022-02-04T04:13:51.000Z"
    }
    // ...rest
  ]
}
```

2. Get One Client

```json
{
  "url": "/api/admin/clients/:client_id",
  "method": "GET",
  "response": {
    "email": "some@email.com",
    "id": 69,
    "role": "client",
    "created_at": "2022-02-04T04:13:51.000Z",
    "updated_at": "2022-02-04T04:13:51.000Z"
  }
}
```

3. Update Client

```json
{
  "url": "/api/admin/clients/:client_id",
  "method": "UPDATE",
  "payload": {
    "role?": "admin",
    "email?": "some@email.com",
    "password?": "newPassword"
  },
  "response": {
    "id": 69,
    "role?": "admin",
    "email?": "some@email.com",
    "updated_at": "2022-02-04T04:13:51.000Z"
  }
}
```

3. Delete Client

```json
{
  "url": "/api/admin/clients/:client_id",
  "method": "DELETE",
  "response": {
    "status": 200,
    "message": "Client was deleted"
  }
}
```

4. Get Tasks

```json
{
  "url": "/api/admin/tasks",
  "queryParams": {
    "title": "My task", // Title filter
    "limit": 100, // How many tasks retrive from db
    "skip": 0 // How many tasks skip before retrive from db
  },
  "method": "GET",
  "response": [
    {
      "id": 69,
      "title": "Meet with friends",
      "description": "Call everyone and invite them to the party",
      "created_at": "2022-02-04T04:13:51.000Z",
      "updated_at": "2022-02-04T04:13:51.000Z"
    }
    // ...rest
  ]
}
```

## Usage example

Let's get some task from running server

```ts
// ...
const getTodos = async (token: string): Promise<Todo[]> => {
  try {
    const response = await fetch('/api/admin/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response.json()) as Todo[];
  } catch (e) {
    throw new Error(e.message);
  }
};

const todos = await getTodos();
//...
```

## Change database

By default this project use SQLite. You can easily chnage it to other one that TypeORM supported.

TypeORM databases supported list:

- MySQL
- MariaDB
- Postgres
- CockroachDB
- SQLite
- Microsoft SQL Server
- Oracle
- SAP Hana
- sql.js.
- MongoDB

In project you need to add additional changes in `src/config/db.config.ts`. You may also need to make some changes to other files, because not all db supports the same TypeORM methods. However it's easy to migrate between SQL databases.

You can check [TypeORM Documentation]("https://typeorm.io/#/") for aditional information

## Support

This is open source project made for help people make their portfolio web sites. If you have an idea to make it better in any way don't hesitate to collaborate!

## Stay in touch

- Website - [suncryptworkflow.com](https://suncryptworkflow.com/)
- LinkedIn - [@suncrypt](https://www.linkedin.com/in/suncrypt)

## License

This ptoject is [MIT licensed](LICENSE).
