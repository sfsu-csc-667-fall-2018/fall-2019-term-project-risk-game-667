# Risk Game Documentation

## Overview

The documentation has several parts

- [Installation](#installation) - Provides instruction how to download and run the game

- [Components](#components) - Provides a walkthrough of the design of the main components

- [Application Flow](#application-flow) - Provides oveview of how the components integrates together 

## Installation

### Requirements

- Linux OS (MacOS will work too, but some steps/commands may vary)
- Node 12+
- Npm (Yarn will work too, but some installation steps/commands may vary)
- Postgres Server
- (Optional) Redis

### Steps

1. Obtain local copy of the project, for example using git, and GitHub:

```bash
git clone https://github.com/sfsu-csc-667-fall-2018/fall-2019-term-project-risk-game-667.git risk-game
cd risk-game
```

2. Generate secure server seed that will be used to sign cookies. For example, using `openssl`: 

```bash
openssl rand -hex 32
```

2. Create `.env` file with seed from previous step, and database connection string. Example of the file: 

```
DATABASE_URL=postgres://<db_user>:<db_password>@<db_host>:<db_port>/<db_name>
SECRET=<your_secret>
```

(Optional) If you want to run redis, add `REDIS_URL` environmental variable to the `.env`. `REDIS_URL` can be either a port, or full url. If the variable is not provided, application automatically fallbacks to in-process sessions storage.

3. Install dependencies. This will automatically run post install script, and make migrations to database.

```bash
npm i
```

### Running

1. Although, we ship game with JavaScript bundled, it might be a good idea to run webpack (build tool) again, in case latest build was not commited:

```bash
npm run build
```

2. Start the application:

```bash
npm run start
```

3. Open your favorite browser on port 3000. For example:

```bash
xdg-open http://localohost:3000/
```


### Development

1. In the first terminal window, start webpack in watch mode:

```
npm run build:dev
```

2. In the second window, start application in development mode:

```
npm run start:dev
```

(Windows users) This may work for you:

```
npm run start:win
```

## Components

The application has several main parts:

- Web Server

- Chat and Lobby

- Gameboard

### Web Server

- Runtime: Node

- Supported protocols: HTTP and WS

- Web framework: Express

- Template engine: Pug

Web Server is key component of the application. It processes various data, and manages the state. It broadcast events to subscribers via WS, and exposes HTTP API allowing to retrive or mutate current state. 

### Lobby and Chat

- Framework: Preact

- Template language: Htm

Lobby and Chat are simple Preact components. Lobby binds to an element with css selector `#lobby`. It uses socket.io to listen for `lobbyEvent`, and update internal state (list of games) using Web Server's HTTP API.

Chat is written to be used as a pluggin. Its id is always last part of the current web page url. The componet binds to an element with css selector `#chat`. Uses socket.io to listen for `messageEvent` with correct chat id.

### Gameboard

- Framework: Vue

- State management: Vuex

Vue component. Game state is managed by Vuex store. Actions are propagated to the Server via HTTP API, where the state is updated. The Server later broadcasts `gameEvent`, which triggers Gameboard component to update the state (also happens via HTTP API). The gameboard itself is svg.  

## Application Flow

Please refer to [slides](https://sfsu-csc-667-fall-2018.github.io/fall-2019-term-project-risk-game-667/)

## Credits & Contributions

- [Gameboard design, and some of game logic](https://codepen.io/AzazelN28/pen/BrGmrd)

- [Soldiers models](https://sketchfab.com/blackspire)

- [Github Actions config](https://dev.to/mscccc/github-actions-deploy-to-heroku-22np)

- [Authentication implementation](https://github.com/jaredhanson/passport-local)

- [Risk logo](cleanpng.com)

- [Other graphics](https://www.canva.com/)
