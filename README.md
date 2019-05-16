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
npm install
npm start
```

## Db

```sh
docker compose -up
docker exec -it mongodb bin/bash
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
