#!/bin/bash

#domain="650b277bd9a54e5cbadc.westeurope.aksapp.io"
docker_repo=$1
docker_tag=$2
releasename=$3
hostname=$4
helm_config=$5
domain=$6

./.travis/push-image.sh $docker_repo $docker_tag

# Move charts into chart repo
echo Clone charts...
git clone https://github.com/Bankdata/charts.git charts

echo Decrypt kube config
openssl aes-256-cbc -K $encrypted_6fbdcc8b6f4d_key -iv $encrypted_6fbdcc8b6f4d_iv -in $TRAVIS_BUILD_DIR/.travis/kube.config.enc -out kube.config -d

helm upgrade \
  --kubeconfig kube.config \
  -i $releasename \
  charts/spa \
  --set image.repository=$docker_repo \
  --set image.tag=$docker_tag \
  --set ingress.host="$hostname.$domain" \
  -f $helm_config