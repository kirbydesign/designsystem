#!/bin/bash

docker_repo=$1
docker_tag=$2

echo Pushing Docker image: $docker_repo:$docker_tag
echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin drbstaging.azurecr.io
docker push $docker_repo:$docker_tag