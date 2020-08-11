# TEQST_Frontend
## Setup
### Install the Ionic Framework and Angular
npm install -g @ionic/cli\
npm i -D -E @angular/cli
### Run a development server at http://localhost:8100
ionic serve
### Run a development server that can be accessed inside the same LAN
ionic serve --address 0.0.0.0\
\
*The IP-address to connect to will be written in the terminal output as "External: IP"*
## Compile for production
ionic build --prod\
\
*The output html files will be written to TEQST_Frontend/www\
Copy them onto a webserver to provide the frontend to users.*
