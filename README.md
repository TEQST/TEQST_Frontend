# TEQST_Frontend
### This repository contains the frontend code of [TEQST](https://github.com/TEQST/TEQST)
## Setup
### Install the Ionic Framework, Angular and other dependencies
npm install -g @ionic/cli\
npm i -D -E @angular/cli\
npm install

### Add the gitignored files to the project
Example for src/proxy.config.json:
```json
{
    "/api/*": {
      "target": "http://127.0.0.1:8000",
      "secure": true,
      "logLevel": "debug",
      "changeOrigin": true
    }
}
```

Example for src/app/constants.ts:
```typescript
export class Constants {
    public static SERVER_URL = '';
    public static REQUEST_TIMEOUT = 30000;
}
```

### Run a development server at http://localhost:8100
ionic serve
### Run a development server that can be accessed inside the same LAN
ionic serve --external\
\
*The IP-address to connect to will be written in the terminal output as "External: IP"*
### Compile for production
ionic build --prod\
\
*The output html files will be written to TEQST_Frontend/www\
Copy them onto a webserver to provide the frontend to users.*

## Developer Guide
The [developer guide](https://github.com/TEQST/TEQST_Frontend/wiki/Guide-for-Developers) contains more information for Frontend Development of TEQST.
