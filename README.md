
## Steps to run(tested on MacOS machines only)


1. Clone this repo 'playwright-automation-sap' and open in VS Code
2. Install 'Playwright test for VSCode' extension on VS Code from Extensions tab
3. From the View -> Command palette in VS Code, 'install playwright'
4. After installation is complete as seen from the Terminal, Click on the 'Testing' Icon
5. Click on the refresh icon to see the tests folder
6. Expand the test folder to see "example.spec.ts"
7. Add the participants email one in each line in the emails.txt within the tests/lib folder
8. Run the relevant tests for eg: "-V2-Add CF: Role Collections" test to add participants email to the GenAI Sub Account CodeJam role collections by clicking on the "play" icon next to each test. 
9. If the tests timeout, check the console and restart the test again

[▶️ Watch the walkthrough video of the test execution](https://video.sap.com/media/t/1_bdjcnmix)

Note: 

1. These tests can be run in any sub account, just change the url within the relevant tests. The demo video shows it running in the GenAI CodeJam sub account
2. Currently about 6 - 8 emails are being processed by the script after which it times out, will look for a solution to make it more stable with less timeouts. So in this case, the script needs to be run again for the unprocessed emails

## ** The below configuration is no longer required on the local machine. **

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
