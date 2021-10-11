# Welcome to New-Bee CRM!!  😄   
This is the project for Unimelb COMP30019 IT-Project.  
Website link :arrow_forward: [New-Bee CRM](https://www.google.com/):arrow_backward:  
It is a website customer relationship managemenet system, which is able to store, search, manage and share your address book for business easily!  

Contributors:  
**Ziyu Qian**   ziyuq@student.unimelb.edu.au  
**Shengjun Su** shengjuns@student.unimelb.edu.au  
**Xinyu Wu** xinyu3@student.unimelb.edu.au  
**Yutong Sun**  yssu3@student.unimelb.edu.au  
**Shenggang Qian** shenggangq@student.unimelb.edu.au  
Tutor:  
**Zhe Wang** zoe.wang1@unimelb.edu.au


## Organisation of folders
* back/
   The server of our web app, containing both admin server and client server
* front/
   The front-end of our web app
   /src
   Containing the components and web pages code of the web app
   /public
   Containg the pics and images used for the web app

## Links to Tools
 * Confluence space - https://new-bees.atlassian.net/wiki/spaces/PROJ/overview
 * Trello board - https://trello.com/b/AXQhdvlp/new-bees-crm
 * server demo - https://new-bee-crm.herokuapp.com/
 * client demo - https://new-bees.netlify.app

## Deployment
Algorithms in Action is written in JavaScript, using the React framework. To make it work locally, you need to install Node.js. NPM (Node package manager) will be installed alongside when you install Node.js. We use express framework to implement our back-end

Ensure you have node version 14.x and npm version 6.x
To check your version, type
node --version 
npm --version

Navigate into front and back folder seperately and run npm install to install all independecies in package.json

Running on local 
Navigate into front and back folder separtely and run npm start, it will start both front and back-end side of web
Front-end side of client will run in port 3000, and will be launched at browser http://localhost:3000
Back-end of client side and admin will run in port 8000
Front-end of admin side will run in 3001, and will be launched at browser http://localhost:3001

Demo
We have two demos that should activate simultaneously to run our app.
First use https://new-bee-crm.herokuapp.com/ to start the server
Then use https://new-bees.netlify.app to start the front-end of client side

We have enabled automatic deploying of both webites. If we commited changes on our repo, the website will automatically updated to the newest version.

The CI of https://new-bees.netlify.app is CI=npm run build
The CI of https://new-bee-crm.herokuapp.com/ is CI=npm start

## Change Log
SPRINT 1
 * US_01_REGISTER_FUNC 
 * US_03_LOG_IN_FUNC  
 * US_06_HOMEPAGE 
 * US_19_LOGIN_PAGE 
 * US_20_REGISTER_PAGE 
 * US_21_DATABASE 
 * Add initial user stories for the whole project
 * Motivational model 
 * Domain model
 * Group decision
 * Coding standard
 * Persona
 * Project requirements
 * Sprint 1 Task arrangement

## Change Log 
### SPRINT 2
 * US_02_EDITINFO
 * US_04_EDITIMAGE
 * US_08_DASHBOARD
 * US_10_SEARCH_BY_ID 
 * US_11_ADD_FRIEND
 * US_12_LOG_OUT 
 * US_17_DELE_FRIEND
 * US_22_INFO_PAGE
 * US_23_INFO_PRIVACY
 * US_25_RETURN_FRIENDS_CONTACT
 * US_26_CHANGE_ID
 * Sprint 1 Retrospective (work left for sprint 2)
 * Sprint 1 Review (client's advice for sprint 1)
 * Sprint 2 Task arrangement
 * User stories update
 * Motivational Model update
 * Domain model
 * Testing report
 * Project Deployment (fail at sprint 2)
 * Future work 

 ### User story completed
 ### SPRINT 1
 Feature | Story ID | Task | Story Estimate | Prioroty | Contributor
 --- | --- | --- | --- |--- |--- 
 Home page | 6 | Build a home page to guide user to the app | 2 | HIGH | ShengGang Qian, Ziyu Qian
 --- | --- | --- | --- |--- |--- 
 Log in | 19 | Build a web page for login with email and password and redirect to dashboard| 5| HIGH | XinYu Wu
 --- | --- | --- | --- |--- |--- 
    | 3 | Use passport to make user log in and send jwt| 5 | HIGH | Ziyu Qian
 --- | --- | --- | --- |--- |--- 
 Register | 1 | Use passport to verify info of new user and save in database | 5 | HIGH | Ziyu Qian
 --- | --- | --- | --- |--- |---  
     | 20 | Build a web page for register with some info | 2 | HIGH | Xinyu WU, YuTong Sun, Ziyu Qian
 --- | --- | --- | --- |--- |---  


 ### Sprint 2
 Feature | Story ID | Task | Story Estimate | Prioroty | Contributor
  --- | --- | --- | --- |--- |---  
Edit information | 2 | User can edit their information and choose to publish it | 5 | HIGH | Xinyu Wu (F), Ziyu Qian (B)
                 | 4 | User can upload an image as their profile image | 8 | HIGH |Xinyu Wu (F), Ziyu Qian (B)

         




