### How to run 

(Assuming that you have the necessary dependencies installed and up to date)

In order to locally run the application, do the following: 
- get a local copy of the code 
- build the docker image used for grading: 
    - go to the `grader-image` folder
		- run `docker build -t grader-image .` (or follow the README.md there)
- run the application: 
    - (go back to the root folder of the code)
		- run `docker compose up --build`

The application is then available at `localhsot:7800`