#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(dirname "${0}")

pushd "${SCRIPT_DIR}/../deployments/service"

function return_to_prevdir {
  popd
}

trap return_to_prevdir EXIT

rm -f plan.bin

terraform init
terraform plan -var-file=terraform.tfvars -out=plan.bin