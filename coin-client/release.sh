#!/usr/bin/env bash

set -eo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPONENT_NAME="$(basename "${SCRIPT_DIR}")"
APP_NAME="$(basename "$(cd "${SCRIPT_DIR}/.." && pwd)")"

###########################################
# INTERNAL FUNCTIONS
###########################################

function isodate() {
  date --iso-8601=seconds
}

function log() {
  echo "$(isodate): $*"
}

log "## Building app: ${APP_NAME}/${COMPONENT_NAME}"
npm run build

log "## Deploying app: ${APP_NAME}/${COMPONENT_NAME}"
aws s3 sync "${SCRIPT_DIR}/dist" s3://coin-balancer-gui