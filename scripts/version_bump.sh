#!/bin/bash

# Bumping the current version

if [[ $TRAVIS_COMMIT_MESSAGE =~ "Bumping version to" ]]; then
    echo "Version bump commit - not bumping version again"
    exit 0;
fi

if [ "$TRAVIS_BRANCH" != "master" ] || [ "$TRAVIS_PULL_REQUEST" != "false" ]; then
    echo "Not master branch - not bumping version"
    exit 0;
fi

echo "Decrypting ssh key"
openssl aes-256-cbc -K $encrypted_1aee80114a78_key -iv $encrypted_1aee80114a78_iv -in scripts/ssh_key.enc -out ssh_key -d

echo "Setting up ssh agent with key"
eval "$(ssh-agent -s)"
chmod 600 ssh_key
ssh-add ssh_key

echo "Updating git origin"
git remote set-url origin git@github.com:kirbydesign/designsystem.git

echo "Bumping version and pushing tags"
git checkout -- package.json
git --no-pager diff
git checkout master
npm version patch -m ":bookmark: Bumping version to %s"
