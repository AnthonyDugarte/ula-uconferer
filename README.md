# uconferer

Plataforma de conferencias virtuales - IS2021 ULA

## Setup

In order to initiate the apps, it is necessary to install:

- [Docker](https://docs.docker.com/get-started/#download-and-install-docker)
- [Docker Compose](https://docs.docker.com/compose/install)

In order to enable the hasura console, it is necessary to be installed:

- [Hasura CLI](https://hasura.io/docs/latest/graphql/core/hasura-cli/install-hasura-cli.html#install-hasura-cli)

> Make sure to install version 2.x.x

### Auth0

Follow the setup steps from [nextjs-auth0](https://github.com/auth0/nextjs-auth0#auth0-configuration).

- `cp .env.local.example .env.local`
- Update values at `.env.local`.

## Initiate apps

```bash
cd apps
docker-compose up
```

Access to the web app in <http://localhost:3000>.

### Hasura Console

> Hasura console has been disabled by default to allow migrations file creation via GUI.

- In order to open the console:

  ```bash
  cd apps/api
  hasura console
  # INFO console running at: http://localhost:9695/
  ```

- Access to the given url: e.g. <http://localhost:9695>
