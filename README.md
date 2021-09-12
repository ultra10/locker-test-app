# Locker test app

## Prerequisites

node
```
npm install
```


## Configuration
Example configuration file:

```
{
  "name": "locker-test-app",
  "server": {
    "ip":"127.0.0.1",
    "port": "80",
    "path": "/",
    "logPath": "./logs",
    "logLevel": "ALL"
  },
  "dataPath": "./data/challenge.json"
}
```

## Usage

Client app is very simple, i use boostrap and jquery. All is in one file at ./src/client/index.html

To run server:
```
node server.js path/to/config.json
```

If path/to/config.json is not given, server will not start

Site can be acces on http://127.0.0.1<br>
entry point: http://127.0.0.1/getData - to get json data
