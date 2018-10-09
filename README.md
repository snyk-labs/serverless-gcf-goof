# serverless-goof
A sample vulnerable serverless application

# Google Cloud Platform setup

## Credentials

Place appropriate Google Cloud Platform credentials in ~/.gcloud/keyfile.json,
by following these instructions: https://serverless.com/framework/docs/providers/google/guide/credentials/

## Google Datastore

These functions use [Google Datastore](https://cloud.google.com/datastore/), which will need to be enabled
on the GCP project in "Datastore" mode (either Cloud Firestore or Cloud Datastore will work).
