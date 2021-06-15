Todolist App(a tiny and simple app)

1. About app:
Todolist app is a  tiny and simple application that helps us to plan work in the simplest and fastest way
app has a few of feature like:
-	Allow user add some tasks to manage ones
-	Allow user update tasks have been added
-	Allow user remove tasks were done
-	Find works by task name or tasks description
-	Simple user interface, easy to use.

2. Structure of project
    .
    ├── public                  
    ├── src                        # source code 
        ├── assets                 # contain image, svg, or sts
        ├── components             # components that may be reused
        ├── routers                # router for app
        ├── views                  # like each of page   
        ├── .env                   # enviroment file to init base_url (if any)
        ├── App.vue                #  
        ├── main.js                # store vuex will be here 
    ├── test/unit                  # for unit test 
    ├── gitignore                  # ignore file
    ├── README.md                  
    ├── babel.config.js            # jest config
    ├── jest.config.js             # babel config
    ├── package-lock.json  
    ├── package.json               # Tools and dependencys
    ├── LICENSE
    └── yarn.lock

3. Installation
All steps to build this application with command in your terminal:
-	Access the github link "https://github.com/Haloi512/todo_app" then clone project:
    "git clone https://github.com/Haloi512/todo_app"
-	Create a new branch and pull code from develop branch: 
    "git checkout -b your_branch"
    "git pull origin develop"
-	Install node_modules with yarn and or npm: 
    <!-- for yarn -->
    "yarn"
    <!-- for npm -->
    "npm install" or shorter syntax "npm i"
-	Finally run the this command and run application in http://localhost:8080
    "yarn serve"


4. Technology and library be used:
    - vue3, vuex4, vue-router, @aacassandra/vue3-progressbar, vue-dk-toast, element-plus, moment, dotnv... be listed in package.json file
5. Some issues when i coding:
    - with sass-loader version 12.0.0 not compatible with vue3, fix by: reduce version of sass-loader to 10.0.0 in package.json, then remove node_modules and install one again.
    - some library not compatible with vue3 so you should check not compatible version before.
    - init form values not catch up lastest value when we select and edit 1 task so you must use watch function with property {deep: true} and write logic in property function handler(){} to listen and update when edit task.
    - unknowed pointer, keyword this, fix by arrow function.

