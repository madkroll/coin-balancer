#!/usr/bin/env bash

set -eo pipefail

APP_NAME="$(cd .. && dirname "${BASH_SOURCE[0]}")"
COMPONENT_NAME="$(dirname "${BASH_SOURCE[0]}")"
AWS_REGION="eu-west-1"
AWS_BUCKET="coin-balancer"

###########################################
# INTERNAL FUNCTIONS
###########################################

function isodate() {
  date --iso-8601=seconds
}

function log() {
  echo "$(isodate): $*"
}

log "## Create S3 buckets"
#aws s3api create-bucket \
#  --bucket "${AWS_BUCKET}" \
#  --region "${AWS_REGION}" \
#  --create-bucket-configuration "LocationConstraint=${AWS_REGION}"

log "## Build ${APP_NAME}/${COMPONENT_NAME}"
npm install

log "## Deploy ${APP_NAME}/${COMPONENT_NAME}"
sls deploy
