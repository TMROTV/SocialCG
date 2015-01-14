# SocialCG
#### Realtime Web Client for CasparCG Server to facilitate social media aggregation and on-air graphics automation.
--------

## Technologies Used
 - node.js
 - AngularJS
 - mongodb
 - socket.io
 
## Requirements
 - Install [node](http://nodejs.org/)
 - Install and Run [mongodb](http://www.mongodb.org/)

## Installation
Get SocialCG
>`git clone https://github.com/TMROTV/SocialCG.git`

Change to the SocialCG directory
>`cd SocialCG`

Install npm dependencies
>`sudo npm install`

Build frontend client
>`npm run build`

Run the server
>`npm start`

Visit the app in your browser
>`http://localhost:8080/`

## Development

Use gulp to automatically rebuild frontend when a file changes.  Server livereload is not yet implemented.
>`gulp watch`

## License
[ISC](LICENSE.md)
