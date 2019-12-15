# WEB_APP
Web application for Mobiilishakki

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Mobiilishakki/WEB_APP/blob/master/LICENSE)
[![Docker Pulls](https://img.shields.io/docker/pulls/mshakki/webapp.svg)](https://hub.docker.com/r/mshakki/webapp)

The web app is the main interface to the Mobiilishakki augmented reality chess system. Briefly it displays the current game state and allows the user to control the [phone camera](https://github.com/Mobiilishakki/Mobiilishakki) acting as a slave device.

## Production usage

To run a production container (from our [DockerHub repo](https://hub.docker.com/r/mshakki/webapp))

```sh
docker run -p 80:3000 mshakki/webapp:release-0.0.1
```

Easy as that!
