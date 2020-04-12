#!/usr/bin/env bash

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

###########################################
# SETTINGS
###########################################

NVM_VERSION=v0.35.3
NODE_VERSION=v13.12.0

###########################################
# EXECUTION
###########################################

log "## Install NVM package manager"
curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" | bash
nvm --version

log "## Install Node JS"
nvm install "${NODE_VERSION}"
nvm use "${NODE_VERSION}"
nvm version

log "## Install libraries globally"
npm install -g serverless
sls --version

log "## Install AWS CLI"
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
rm awscliv2.zip
sudo ./aws/install
aws --version