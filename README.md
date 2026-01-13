## Run on terminal

```bash
defaults write org.chromium.Chromium AutoSelectCertificateForUrls -array-add -string '{"pattern":"[*.]sap.com","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}'
defaults write org.chromium.Chromium AutoSelectCertificateForUrls -array-add -string '{"pattern":"[*.]sap.corp","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}'
defaults write org.chromium.Chromium AutoSelectCertificateForUrls -array-add -string '{"pattern":"[*.]cloud.sap","filter":{"ISSUER":{"CN":"SSO_CA"}}}'
defaults write org.chromium.Chromium AutoSelectCertificateForUrls -array-add -string '{"pattern":"[*.]cloud.sap","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}'
```

## Set Chrome plist

- Create a new file: `/Library/Preferences/com.google.Chrome.plist`

```bash
sudo vi /Library/Preferences/com.google.Chrome.plist
```

- Paste the below content:

```xml
<plist version="1.0">
<dict>
  <key>AutoSelectCertificateForUrls</key>
   <array>
     <string>{"pattern":"[*.]cloud.sap","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}</string>
     <string>{"pattern":"[*.]cloud.sap","filter":{"ISSUER":{"CN":"SSO_CA"}}}</string>
     <string>{"pattern":"[*.]sap.corp","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}</string>
     <string>{"pattern":"[*.]sap.com","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}</string>
     <string>{"pattern":"[*.]sap-ag.de","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}</string>
     <string>{"pattern":"[*.]sap.corp","filter":{"ISSUER":{"CN":"SSO_CA"}}}</string>
     <string>{"pattern":"[*.]sap.com","filter":{"ISSUER":{"CN":"SSO_CA"}}}</string>
     <string>{"pattern":"[*.]sap-ag.de","filter":{"ISSUER":{"CN":"SSO_CA"}}}</string>
   </array>
</dict>
</plist>
```

## Check policies

Open `chrome://policy/` in Chrome.

## Reference

[How to automatically select SAP client certificate in Google Chrome](https://community.sap.com/t5/additional-blog-posts-by-members/how-to-automatically-select-sap-client-certificate-in-google-chrome/bc-p/13040670)
