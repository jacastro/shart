# UADE - Seminario de integración profesional 2 - Shart

This is the Backend & Frontend Shart application, where you can develop projects, found people like you and work collaborative.

You have to register to as a project developer, or just a customer to use it.

When you register, you provide a valid email and basic data, that will be completed with FullContact information.

Valid actions:

list xxx
create xxx
update xxx
delete xxx

## Install

```sh
# not versioned file
echo 'PORT=3333' > .env
npm install
npm start
curl http://localhost:3333/api # check
# open in browser http://localhost:3333
```

## Db

```sh
docker-compose up -d
docker exec -it mongoDBSem2 bin/bash
/usr/bin/mongo
> show dbs
> use uade_sem2_shart;
> db.stats()
> db.getCollectionNames()
> db.users.insert({  user_name: 'admin', mail: 'admin@shart.com' })
```

## Response Status Code

- 200: OK
- 500: Error
- 404: Not Found
- 403: Authentication Error

## API Routes

- /api/users [GET]
- /api/users/:id [GET]
- /api/clients [GET]
- /api/clients/:id [GET]
- /api/mes [GET]
- /api/mes/:id [GET]
- /api/users/:user_id/projects [GET] [POST]
- /api/projects/:id [GET] [PUT] [DELETE]
- /api/projects/:id/rate [POST]

## Postman collection

[postman](https://www.getpostman.com/collections/4eaeb2cdeda7cc5b5c3d)

