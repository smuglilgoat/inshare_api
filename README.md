# inShare API

Server side of **inShare**, a community driven file sharing website. Built with AdonisJS 4 and Node.js.

See [inshare_client](https://github.com/smuglilgoat/inshare_client) for the Vue front end.

## What it does

A JWT-authenticated REST API for users, uploaded documents and their metadata:

- **Auth** — `POST /auth/register`, `POST /auth/login`; JWT for protected routes.
- **Users** — profile read/update/delete, user search (`/users-list`), avatars.
- **Documents** — create by type (`t=:type`), read, update, delete, filter by category, user or tags.
- **Files** — document download, preview images, video and document viewers, certificates.
- **Community** — tags, ratings, comments and report-by-mail on a document.

Models and migrations cover `User`, `Document`, `Doc`, `Image`, `Video`, `Tag`, `Rating`, `Comment` and `Certificat`.

## Stack

- AdonisJS 4.1 (`@adonisjs/framework`, Lucid ORM, auth, drive, mail)
- Node.js, MySQL or SQLite through Lucid (`config/database.js` also declares PostgreSQL)
- JWT authentication (`config/auth.js`)

## Getting started

```bash
npm install
cp .env.example .env
```

Set at least `APP_KEY` in `.env` (used as the JWT secret), then create the schema and start the server:

```bash
node ace migration:run
npm start          # node server.js, port 3333 by default
```

Database settings come from `DB_*` variables in `.env`; the example uses SQLite.

## Notes

- `app/Controllers/Http/FileController.js` uses absolute Windows paths (`G:\Documents\...`) for avatars, certificates and downloads. Change them before running on another machine.
- File endpoints read and write under `app/Files/`; only a placeholder avatar is versioned.
- The API accepts JSON bodies; authenticated routes expect `Authorization: Bearer <token>`.
- No automated test suite is included (`npm test` runs `node ace test`).
