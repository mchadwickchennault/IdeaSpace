# Docker Setup for Content Tools
To start the environment, cd into the `docker` directory and run `docker-compose up -d --build`

You will need to ensure that you are sharing the folder containing this source code with Docker. This can be set in `Docker->Preferences->File Sharing`.

You will also need to ensure that you are not running a local copy of Apache (or any other web server) or MySQL BEFORE starting Docker.

Once Docker is up and running, you will be able to view the app at `localhost`.