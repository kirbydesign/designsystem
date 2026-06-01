#!/usr/bin/env bash
set -euo pipefail

name="${1}"
name="${name##*/}"
name="${name,,}"
name="${name//[^a-zA-Z0-9]/-}"
name=$(tr -s '-' <<< "$name")
name="${name%%-}"
echo "kby-${name:0:49}"
