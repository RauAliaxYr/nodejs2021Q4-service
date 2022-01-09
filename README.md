# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging

### Log status
If you're want another log status, change parameter ``LOG_STATUS`` into ``.env`` (default 2)
```
0: error (ошибка)
1: warn (предупреждение)
2: info (информация)
```
All logs handled into the ``log.txt`` file, Errors logs handled into the ``logErrors.txt`` file

### How to start with Docker
First of all you need to install docker ``https://www.docker.com`` 

If you want to use custom port, into the file ``.env`` you need to change parameter PORT(default 4000).
After that you need to use the command to start:
```
docker-compose up
``` 
if you want to start application in the background, use the command:
```
docker-compose up -d
```

