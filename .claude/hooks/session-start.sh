#!/bin/bash
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Install AWS CLI v2 if not already present
if ! command -v aws &>/dev/null; then
  apt-get update -qq --ignore-missing 2>/dev/null || true
  apt-get install -y -qq unzip curl

  curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o /tmp/awscliv2.zip
  unzip -q /tmp/awscliv2.zip -d /tmp/awscli
  /tmp/awscli/aws/install --update
  rm -rf /tmp/awscliv2.zip /tmp/awscli
fi

echo "AWS CLI version: $(aws --version)"
