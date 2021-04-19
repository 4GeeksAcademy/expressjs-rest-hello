# Boilerplate with PostgreSQL with admin

[![Open in GitPod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/manuelabarca/boilerplate_postgresql)

## How to login in admin?

In order to login to the database select "postgres" and use:

| property |  value            |
| -------- | ----------------- |
| system   |  PostgreSQL       |
| server   |  *don't touch it* |
| username |  gitpod           |
| password |  gitpod           |
| database |  postgres         |

👉 Choose the **permanent login** option so next
time you run the workspace, you'll be able to login with just one click.

## PostgreSQL


This will give you an auto-starting PostgreSQL server (it should auto-start every time you open a new Terminal), plus a few utility scripts that you can run in a Terminal or in a .gitpod.yml command:

```
pg_start: start the PostgreSQL service
pg_stop: stop the PostgreSQL service
pg_ctl status: check if the PostgreSQL service is running
Once the PostgreSQL server is running, you can use the psql CLI as usual:

$ psql -h localhost -d postgres
psql (10.8 (Ubuntu 10.8-0ubuntu0.18.10.1))
Type "help" for help.

postgres=#
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)