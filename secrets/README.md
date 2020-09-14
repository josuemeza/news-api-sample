# Secrets

On this folder, you need to create a required secrets files to the app. This folder ignores all `*.json`, `*.yml` and `*.env` files.

## Development required secrets

1. `credentials.json`

    The service account credentials.

2. `app.env`

    Contains all app required secrets. Next table shows the needed variables on this file.

    | Variable | Description |
    | --- | --- |
    | `CREDENTIALS` | Path to `credentials.json`. *Recommended value: `/secrets/credentials.json`.* |
    | `PORT` | Port to run the app. *Ex. 3000* |
    | `API_KEY` | Key sended on header requests to allow the usage. |

## Cloud admin required secrets

1. `infrastructure.env`

    Contains the **cloud function setup values** to use on deploy process. Next table shows the needed variables on this file.

    | Variable | Description |
    | --- | --- |
    | `GCP_CF_NAME` | Cloud function name. |
    | `GCP_CF_ENTRY_POINT` | Function to use like entry point on the code. |
    | `GCP_CF_RUNTIME` | Google runtime to execute the app. |
    | `GCP_CF_REGION` | Region to store the cloud function. |
    | `GCP_CF_MEMORY` | Memory to allocate on the runtime. |
    | `GCP_CF_ENV_FILE` | Path to environment variables file to allocate on the cloud function. *Recommended value: `./secrets/function.env.yml`* |
    | `GCP_CF_MAX_INSTANCES` | Max number of instances allowed to execute the function. |

2. `function.env.yml`

    Contains the environment variables to set on the cloud function. Next table shows the needed variables on this file.

    | Variable | Description |
    | --- | --- |
    | `CREDENTIALS` | Path to `credentials.json`. |
    | `API_KEY` | Key sended on header requests to allow the usage. |