# Outlines
All the versions mentioned are the recommended ones

# Install NodeJS 16.17.0
With the following link: https://nodejs.org/en/download/

# Update the package manager
>npm update

# Install the dependencies
>cd ~/project/lhc.lu
>npm install

# Run the project
>npm start
## Production with Dokploy

The production site is deployed from `compose.yml`. The Dockerfile builds the
React application with Node 24 and serves the compiled files with nginx as an
unprivileged user. The runtime filesystem is read-only, with a small temporary
filesystem for nginx. Browser routes fall back to `index.html`; missing assets
return 404.

For a local production check:

```sh
docker compose -p lhc-local up --build -d --wait
python3 tests/smoke.py http://127.0.0.1:18087
python3 tests/healthcheck.py lhc-local
docker compose -p lhc-local down
```

Deploy this repository as a Docker Compose service in Dokploy using
`compose.yml`. Configure domains, HTTPS and environment settings in Dokploy.
Keep environment-specific deployment and recovery instructions in private
operations documentation.
