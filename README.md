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

In Dokploy, create a **Docker Compose** service using this repository, branch
`main`, and Compose path `./compose.yml`. Enable automatic deployment using the
Git push webhook. Do not enable isolated deployments: Apache uses the stable
loopback port. `LHC_HTTP_PORT` defaults to `18087` and can be set in Dokploy if
that port must change; update the Apache upstream at the same time.

During the host's gradual migration, Apache owns public ports 80/443 and TLS for
`lhc.lu` and `www.lhc.lu`, proxying HTTPS requests to `127.0.0.1:18087`. Do not add
Dokploy-managed domains or start Traefik on those public ports until the other
sites have been migrated. Keep the ACME challenge path served by Apache.

The old production SCP workflow has been replaced by container validation.
The validation-branch deployment remains separate. Production deployment must
come from Dokploy so that a push cannot overwrite the retained Apache rollback
files. The container workflow checks the production image on pushes and PRs.
