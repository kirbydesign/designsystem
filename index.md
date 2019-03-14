# Download Cookbook Application

{% for release in site.github.releases limit:10 %}
## Release {{release.tag_name}}
{% for asset in release.assets %}
{% if asset.name contains ".plist" %}
 * [iOS](itms-services://?action=download-manifest&url={{ asset.browser_download_url}})
{% endif %}
{% if asset.name contains ".apk" %}
 * [Android]({{ asset.browser_download_url}})
{% endif %}
{% endfor %}
{% endfor %}
