#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(dirname "${0}")

pushd "${SCRIPT_DIR}/../deployments/service"

function return_to_prevdir {
  rm -f plan.bin
  popd
}

trap return_to_prevdir EXIT

terraform apply -auto-approve "plan.bin"
