gcloud functions deploy $GCP_CF_NAME \
  --entry-point $GCP_CF_ENTRY_POINT \
  --runtime $GCP_CF_RUNTIME \
  --region $GCP_CF_REGION \
  --memory $GCP_CF_MEMORY \
  --max-instances $GCP_CF_MAX_INSTANCES \
  --set-env-vars  API_KEY=$APP_API_KEY\
  --trigger-http