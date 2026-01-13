
### Run on terminal

defaults write org.chromium.Chromium AutoSelectCertificateForUrls -array-add -string '{"pattern":"[*.]sap.com","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}'


defaults write org.chromium.Chromium AutoSelectCertificateForUrls -array-add -string '{"pattern":"[*.]sap.corp","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}'


defaults write org.chromium.Chromium AutoSelectCertificateForUrls -array-add -string '{"pattern":"[*.]cloud.sap","filter":{"ISSUER":{"CN":"SSO_CA"}}}'

defaults write org.chromium.Chromium AutoSelectCertificateForUrls -array-add -string '{"pattern":"[*.]cloud.sap","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}'

### Set Chrome plist
create new file
sudo vi /Library/Preferences/com.google.Chrome.plist

paste the below
<plist version="1.0">
<dict>
  <key>AutoSelectCertificateForUrls</key>
   <array>
     <string>{"pattern":"[*.]cloud.sap","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}</string>
     <string>{"pattern":"[*.]cloud.sap","filter":{"ISSUER":{"CN”:”SSO_CA”}}}</string>   
     <string>{"pattern":"[*.]sap.corp","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}</string>
     <string>{"pattern":"[*.]sap.com","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}</string>
     <string>{"pattern":"[*.]sap-ag.de","filter":{"ISSUER":{"CN":"SAP SSO CA G2"}}}</string>
     <string>{"pattern":"[*.]sap.corp","filter":{"ISSUER":{"CN":"SSO_CA"}}}</string>
     <string>{"pattern":"[*.]sap.com","filter":{"ISSUER":{"CN":"SSO_CA"}}}</string>
     <string>{"pattern":"[*.]sap-ag.de","filter":{"ISSUER":{"CN":"SSO_CA"}}}</string>
   </array>
</dict>
</plist>



### Check policies

chrome://policy/

### Reference
https://community.sap.com/t5/additional-blog-posts-by-members/how-to-automatically-select-sap-client-certificate-in-google-chrome/bc-p/13040670
