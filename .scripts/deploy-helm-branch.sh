#!/bin/bash

git_repo="designsystem"
domain="650b277bd9a54e5cbadc.westeurope.aksapp.io"
docker_repo=$1
docker_tag=git$github.sha
helm_config=$2
feature="feature"

if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
    branchname=$TRAVIS_PULL_REQUEST_BRANCH;
else
    branchname=$TRAVIS_BRANCH;
fi

if [ "$TRAVIS_BRANCH" != "master" ] || [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
    branchname=${branchname//$feature\//}
    branchname=${branchname#?}
    releasename="$git_repo-${branchname//[^a-zA-Z0-9]/-}";
    releasename=$(tr [A-Z] [a-z] <<< "$releasename")
    releasename=$(cut -c 1-53 <<< "$releasename")
    if [ "${releasename:52}" = "-" ]; then
      releasename="${releasename:0:52}"
    fi
else
    releasename=$git_repo;
fi

hostname=`./.travis/dns.pl $domain $releasename`

./.travis/deploy-helm.sh $docker_repo $docker_tag $releasename $hostname $helm_config $domain