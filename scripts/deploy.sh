#!/bin/sh

echo "<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">
      <plist version=\"1.0\">
      <dict>
        <!-- array of downloads. -->
        <key>items</key>
        <array>
         <dict>
          <!-- an array of assets to download -->
           <key>assets</key>
            <array>
             <!-- software-package: the ipa to install. -->
              <dict>
               <!-- required. the asset kind. -->
                <key>kind</key>
                <string>software-package</string>
                <!-- required. the URL of the file to download. -->
                <key>url</key>
                <string>https://github.com/kirbydesign/designsystem/releases/download/$1/designsystem.ipa</string>
              </dict>
              <!-- display-image: the icon to display during download.-->
              <dict>
               <key>kind</key>
               <string>display-image</string>
               <key>url</key>
               <string>https://www.jyskemunnypot.dk/media/1018/jyske_new_logo.svg</string>
              </dict>
              <!-- full-size-image: the large 512x512 icon used by iTunes. -->
              <dict>
               <key>kind</key>
               <string>full-size-image</string>
               <key>needs-shine</key>
               <true/>
               <key>url</key>
               <string>https://www.jyskemunnypot.dk/media/1018/jyske_new_logo.svg</string>
              </dict>
            </array><key>metadata</key>
            <dict>
             <!-- required -->
             <key>bundle-identifier</key>
             <string>dk.kirby.design.system</string>
             <!-- optional (software only) -->
             <key>bundle-version</key>
             <string>1.0</string>
             <!-- required. the download kind. -->
             <key>kind</key>
             <string>software</string>
             <!-- optional. displayed during download; typically company name -->
             <key>subtitle</key>
             <string>Cookbook</string>
             <!-- required. the title to display during the download. -->
             <key>title</key>
             <string>Kirby design system</string>
            </dict>
          </dict>
        </array>
      </dict>
      </plist>" >> manifest.plist
echo "<html>
        <body>
          <h5>Enterprise In-House App distribution - $1</h5>
              <a href=\"itms-services://?action=download-manifest&url=https://github.com/kirbydesign/designsystem/releases/download/$1/manifest.plist\">Download Your App</a>
          </body>
      </html>" >> ./scripts/html/index.html
