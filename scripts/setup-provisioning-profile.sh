#!/bin/sh

#
# Doing steps necesary to set up provisioning profile in an automated way.
#

# Open up encoded certificate files
openssl aes-256-cbc -k "$SECURITY_PASSWORD" -in $TRAVIS_BUILD_DIR/scripts/profile/dkkirbydesignsystem.mobileprovision.enc -d -a -out $TRAVIS_BUILD_DIR/scripts/profile/dkkirbydesignsystem.mobileprovision
openssl aes-256-cbc -k "$SECURITY_PASSWORD" -in $TRAVIS_BUILD_DIR/scripts/certs/ios_distribution.cer.enc -d -a -out $TRAVIS_BUILD_DIR/scripts/certs/ios_distribution.cer
openssl aes-256-cbc -k "$SECURITY_PASSWORD" -in $TRAVIS_BUILD_DIR/scripts/certs/762JF2TAEN.p12.enc -d -a -out $TRAVIS_BUILD_DIR/scripts/certs/762JF2TAEN.p12

# Create a custom keychain
security create-keychain -p travis ios-build.keychain

# Make the custom keychain default, so xcodebuild will use it for signing
security default-keychain -s ios-build.keychain

# Unlock the keychain
security unlock-keychain -p travis ios-build.keychain

# Set keychain timeout to 1 hour for long builds
# see http://www.egeek.me/2013/02/23/jenkins-and-xcode-user-interaction-is-not-allowed/
security set-keychain-settings -t 3600 -l ~/Library/Keychains/ios-build.keychain

# Add certificates to keychain and allow codesign to access them
security import $TRAVIS_BUILD_DIR/scripts/certs/AppleWWDRCA.cer -k ~/Library/Keychains/ios-build.keychain -T /usr/bin/codesign
security import $TRAVIS_BUILD_DIR/scripts/certs/ios_distribution.cer -k ~/Library/Keychains/ios-build.keychain -T /usr/bin/codesign
security import $TRAVIS_BUILD_DIR/scripts/certs/762JF2TAEN.p12 -k ~/Library/Keychains/ios-build.keychain -P $P12_KEY -T /usr/bin/codesign
security set-key-partition-list -S apple-tool:,apple: -s -k travis ios-build.keychain

# Put the provisioning profile in place
mkdir -p ~/Library/MobileDevice/Provisioning\ Profiles
cp "$TRAVIS_BUILD_DIR/scripts/profile/dkkirbydesignsystem.mobileprovision" ~/Library/MobileDevice/Provisioning\ Profiles/
