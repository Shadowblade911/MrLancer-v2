# MrLancer

Fill me in

## Running with Docker

To run this bot populate the environment variables listed in `sample.env` either
in a `.env` file or through some other mechanism (note that `PGPORT` **must** be
5432).
Then run:

```sh
docker compose -f docker-compose.prod.yml up
```

to start MrLancer in production mode or

```sh
docker compose up
```

to start MrLancer in development mode.

In development mode the adminer database UI will be available at
http://localhost:8080.
