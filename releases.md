# Download Cookbook Application

{% for release in site.github.releases limit:10 %}
## Release {{release.tag_name}}
 * [iOS](itms-services://?action=download-manifest&url=https://github.com/kirbydesign/designsystem/releases/download/{{ release.tag_name }}/manifest.plist)
 * Android
{% endfor %}
