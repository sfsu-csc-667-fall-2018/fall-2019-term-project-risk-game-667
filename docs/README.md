# Risk Game Documentation

## Overview

The application has several main parts:

- Web Server written in Express, and Pug as template enginge

- Chat component written in Preact

- Game component written in Vue

Components communicate using HTTP and Websocket protocols, using axios and socket.io, respectively. 

## Requirements

- Node & npm or yarn
- Postgres Server
- Redis (For persistent sessions)

## Installation

1. Generate secure and random server seed, for example: 

```bash
openssl rand -hex 32
```

Have your seed, and postgres connection string handy. Your are going to use it in next step.

2. Create .env file that looks the following way:

```
DATABASE_URL=postgres://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>
SECRET=<your_secret>
```

3. Please complete step 1-2, before proceeding otherwise your post-install script will fail! 

Install dependencies:

```bash
npm i
```

This will also run database migrations.


## Development

1. In first terminal window, start Webpack in watch mode

```
npm run build:watch 
```

2. In second window, start Express 

On Linux

```
npm run start:dev 
```

On Windows

```
npm run start:win 
```
