# Viewing this Project
This project can be pretty quickly and easily viewed using Docker if you have Docker installed. Check out the [Docker Readme](./docker/readme.md) for further instructions.

If you would like to set the project up in your own environment, you will need to create an `ideaspace` database and update the `.env` file to point to your database. Once that is done you can run `php artisan migrate` and `php artisan db:seed --class=IdeasTableSeeder` to setup the data base.

Once that is done, everything should be set up. Although it wouldn't hurt to run `npm run dev` just in case.

I had a lot of fun working on this project. I wish I had more time to add things like Jest testing, robust error handling, and idea patching.

A few notable features you should be aware of are:
* To add a new idea click the "plus" icon at the bottom right of the screen.
* To view an idea in greater detail, click the corresponding row on the table.
* When adding an idea, "Title" and "Description" are required. You will receive errors if you try to submit the form without them.
* Duplicate titles are disallowed. If you attempt to save an idea with a repeat title, you will receive a warning dialog.

Thank you again for this fun opportunity. I look forward to discussing my code with you.