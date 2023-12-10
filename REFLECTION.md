### Reflection on the work done 

For the structure of this quick reflection, I'll simply go through each requirements for passing and briefly detail what I've done

- The front end of the application has been quickly built and styled with Tailwind. In my opinion it looks quite decent and is easily readable and usable. The main thing I would improve about it is the text area in which the user write the code: for now it's just a regular text area and is not very suited for writing code (tabs are not allowed, there is no formatting etc...)

- When a programming assignment is submitted, the submission is stored into the database table `programming_assignment_submissions` as required, and upon submission submissions with the same assignment and code are looked from the database table. If a matching entry is found, the values fot `submission_status`, `grader_feedback` and `correct` are copied from the matching submission and the code is not sent for grading. Otherwise, the code is added to a gradingQueue. 

- This grading queue is managed with Deno.kv: items in the queue are processed one by one and sent to the grading service. Deno.kv is still relatively knew, so I'm not 100% sure of how it works in the background (this is one of the things I could probably improve) but it seems to work just fine for such a simple utilisation. 

- When a user makes a new submission, a new database submission is created with the status 'pending', and the data of that database submission (including in particular its id in database and status) is sent back to the client. Upon receiving the database submission data, if the status is 'pending' the client will wait a second (arbitrary duration to avoid flooding the server with requests) and fetch again the data of the submission in database, using the database id it just received. A separate endpoint is used for that. The user does not need to refresh the page to see the results. 

- The project has both development and production configuration. The production configuration removes the flags `--allow-read` and `--watch`, from Dockerfiles, and stores the content of the database locally in the folder `production-database-data` in order for the data to be persistent. It also runs astro in build mode, and set restars to `on-failure` for the services. 