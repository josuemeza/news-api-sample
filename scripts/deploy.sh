export $(cat secrets/infrastructure.env)
gcloud init
gcloud functions deploy $GCP_CF_NAME \
  --entry-point $GCP_CF_ENTRY_POINT \
  --runtime $GCP_CF_RUNTIME \
  --region $GCP_CF_REGION \
  --memory $GCP_CF_MEMORY \
  --env-vars-file $GCP_CF_ENV_FILE \
  --max-instances $GCP_CF_MAX_INSTANCES \
  --trigger-http