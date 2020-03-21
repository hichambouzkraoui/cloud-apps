# create-app 
An enterprise platform boilerplate, powered by React, Node, Postgres and Docker.       
        
Production version available here: http://create-app.us-east-2.elasticbeanstalk.com/        
        
## About the Product 

In software enterprises its common to have a variety of applications, written in multiple programming languages, to solve business problems. 

This product aims to challenge the norm, by using a single programming language (JavaScript) and common design
 patterns to power a software system. 
  
For a deeper dive into the drivers behind this project, read through [`documentation/concept.md`](https://github.com/escobard/create-app/blob/master/documentation/concept.md)        
  
## Scripts - this area needs work        
 These scripts assume the user is on the root directory and has `npm`, `node`, `docker` & `docker-compose` installed.        
        
### Docker        
 The following scripts are used to start our applications as `docker` images, then connects them together through a network created by `docker-compose` to simulate a live staging environment.    
        
#### Development        
 `npm run dev`            
 #### All application tests  
  `npm run test`  
  #### Prod debugging        
 `npm run prod`   
  ### NPM - LEGACY        
 The following scripts can be used to run the UI and the API application `concurrently`.         
        
Using `concurrently` is not recommended. For debugging, it's recommended to run each application individually.  
        
The following scripts assume:        
        
1. `npm install` has been run in the `./`,`./ui` and `./api` directories.        
        
##### Local development for UI and API        
 `npm run dev-legacy`        
 ##### Run unit tests on UI and API        
 `npm run test-legacy`   
 ## UI - this area needs work - Follow API format  
  UI documentation can be found here: [documentation/ui.md](https://github.com/escobard/create-app/blob/master/documentation/ui.md)        
        
UI usage doc can be found here: [api/README.md](https://github.com/escobard/create-app/blob/master/ui/README.md)        
        
## API   
The API - powered by Node.js and Express.js - acts as an ORM, controlling the communications between the UI and DB applications.    
  
You can find the API's functional code and usage documentation within the [`api`](https://github.com/escobard/create-app/tree/master/api) directory. For expanded API documentation, have a read through [`documentation/api.md`](https://github.com/escobard/create-app/blob/master/documentation/api.md).  
  
## DB - Follow API format  
  
## Integration - Follow API format  
  
## E2E - Follow API format  
  
## DevOps - Follow API format  
  
## nginx - Follow API format  
  ## Contribution - this area needs work  
  Contribution documentation can be found here: [documentation/contribution.md](https://github.com/escobard/create-app/blob/master/documentation/contribution.md)