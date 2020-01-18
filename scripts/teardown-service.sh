#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(dirname "${0}")

pushd "${SCRIPT_DIR}/../deployments/service"

function return_to_prevdir {
  popd
}

trap return_to_prevdir EXIT

terraform init
terraform destroy -var-file=terraform.tfvars
