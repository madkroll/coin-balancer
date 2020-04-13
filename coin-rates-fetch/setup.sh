#!/usr/bin/env bash

APP_NAME="$(cd .. && dirname "${BASH_SOURCE[0]}")"
COMPONENT_NAME="$(dirname "${BASH_SOURCE[0]}")"

set -eo pipefail

###########################################
# INTERNAL FUNCTIONS
###########################################

function isodate() {
  date --iso-8601=seconds
}

function log() {
  echo "$(isodate): $*"
}

log "## Build ${APP_NAME}/${COMPONENT_NAME}"
npm install

log "## Deploy ${APP_NAME}/${COMPONENT_NAME}"
sls deploy
