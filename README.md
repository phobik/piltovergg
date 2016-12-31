# piltover.gg

This is a League of Legends stat tracking/match history web application (based on [op.gg](https://op.gg)) built as a learning experience.

This app made of two components, a `server` and a `client`. The `server` is a fairly minimal [express](https://github.com/expressjs/express) application serving a few API endpoints. The server uses [Redis](https://redis.io/) for caching data sets returned by Riot's API. The `client` is a [react](https://facebook.github.io/react/) application initialized using [create-react-app](https://github.com/facebookincubator/create-react-app). The `client` also utilizes [redux](https://github.com/reactjs/redux) for maintaining and interfacing with the application state.

## Local Development

In order to run this project locally, you'll need to have [Docker](https://www.docker.com/) installed along with [docker-compose](https://docs.docker.com/compose/) in order to run Redis locally. You could also feasibly just run Redis on `localhost` and, using [environment variables](#environment-variables), point your server at that instances. Docker is a bit easier though and more predictable.

To run the application in development mode (with hot reloading for the client and auto-restart via [nodemon](https://github.com/remy/nodemon)), run the following commands in the project's root.

```bash
# Start the Docker container for Redis (-d suppresses output)
docker-compose up -d

# Start the server and the client in dev mode
npm run start-dev
```

See the `package.json` file in the project's root for more info on what this script is doing. It's using [concurrently](https://github.com/kimmobrunfeldt/concurrently) to run servers for the `client` and `server`.

## Environment Variables

The `server` uses [dotenv](https://github.com/motdotla/dotenv) for loading environment variables. The following environment variables are supported:

| Name | Description | Default |
|------|-------------|---------|
| REDIS_HOST | The host for the Redis instance used for caching by the server | N/A |
| REDIS_PORT | The port on which Redis listens | N/A |
| RIOT_API_KEY | API key used for authenticating to Riot's LoL API | N/ A |
| PORT | Port on which the Express server will listen | 8000 |
