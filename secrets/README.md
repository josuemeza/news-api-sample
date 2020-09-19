# Secrets

On this folder, you need to create a required secrets files to the app. This folder ignores all `*.json`, `*.yml` and `*.env` files.

## Development required secrets

1. `credentials.json`

    The service account credentials.

2. `app.env`

    Contains all app required secrets. Next table shows the needed variables on this file.

    | Variable | Description |
    | --- | --- |
    | `GCP_DB_CREDENTIALS` | Path to `credentials.json` |
    | `PORT` | Port to run the app. *Ex. 3000* |
    | `API_KEY` | Key sended on header requests to allow the usage. |