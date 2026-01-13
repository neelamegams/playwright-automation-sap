import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import { parse } from "csv-parse/sync";
import { text } from 'stream/consumers';


test('Add CF:Org Member Role', async ({ page }) => {
  //BuildX Tile
  // Go to the SAP BTP Cockpit page - > CF -> Org Members
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/1684622a-6a26-475a-8948-efdecd3cfc7f/users',  {waitUntil: "domcontentloaded"});

  //Deny all cookies
  await page.locator('#truste-consent-required').click();

  //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log(fileContent);

  //Click on Add Members button
  const AddMembersButton = page.locator('#__page0-header #__xmlview0--addOrgMembers');
  await AddMembersButton.waitFor({ state: 'visible' });
  await AddMembersButton.click();
  
  // Fill a textarea with some text using Playwright
  const textarea = page.locator('textarea#addOrgMemberEmails-inner');
  await textarea.waitFor({ state: 'visible' });
  await textarea.fill(fileContent);

  const OrgUserCheck1 = page.getByRole('checkbox', { name: 'Org User' });
  await OrgUserCheck1.check();

  const AddButton = page.locator('#__dialog0-footer #__button25');
  await AddButton.waitFor({ state: 'visible' });
  await AddButton.click();
 
});

test('Delete CF:Org Member Role', async ({ page }) => {
  //BuildX Tile
  // Go to the SAP BTP Cockpit page - > CF -> Org Members
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/1684622a-6a26-475a-8948-efdecd3cfc7f/users',  {waitUntil: "domcontentloaded"});

  //Deny all cookies
  await page.locator('#truste-consent-required').click();

 //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log(fileContent);
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Example: log each line
    for (const line of lines) {
      await page.getByRole("row").filter({hasText: line}).locator('button', {hasText:'Delete'}).click();

      //Confirm removal in the pop up dialog
      const RemoveButton = await page.locator(".sapMDialogFooter").getByRole('button', { name: 'Delete' });
      await RemoveButton.waitFor({ state: 'visible' });
      await RemoveButton.click();
      
    }
 
});

test('Add CF:Space Developer Role', async ({ page }) => {
  //BuildX Tile
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/1684622a-6a26-475a-8948-efdecd3cfc7f/users',  {waitUntil: "domcontentloaded"});

  await page.locator('#truste-consent-required').click();

  //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log(fileContent);

  //Cloud Foundry >> Spaces >> dev space name >> Space Members >> Add members >> Paste bulk email >> Give Space Developer role
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/1684622a-6a26-475a-8948-efdecd3cfc7f/spaces');

  const SpaceTileLink = page.locator('.cf-uis--spaceTileControl .cf-uis--tileHeader');
  await SpaceTileLink.waitFor({ state: 'visible' });
  await SpaceTileLink.click();

  const SpaceMembersLink  = await page.locator('a[title="Space Members"]');
  await SpaceMembersLink.waitFor({ state: 'visible' });
  await SpaceMembersLink.click()
  
  const AddSpaceMembersButton = await page.locator('#__xmlview2--addSpaceMembers');
  await AddSpaceMembersButton.waitFor({ state: 'visible' });
  await AddSpaceMembersButton.click();

   // Fill a textarea with some text using Playwright
  const textarea = await page.locator('textarea#__area0-inner');
  await textarea.waitFor({ state: 'visible' });
  await textarea.fill(fileContent);

  const SpaceDeveloperCheck =  await page.getByRole('checkbox', { name: 'Space Developer' });
  await SpaceDeveloperCheck.check();

  const AddButton = await page.locator('#__dialog0-footer #__button68');
  await AddButton.waitFor({ state: 'visible' });
  await AddButton.click();
});

test('Delete CF:Space Developer Role', async ({ page }) => {
  //BuildX Tile
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/1684622a-6a26-475a-8948-efdecd3cfc7f/users',  {waitUntil: "domcontentloaded"});

  await page.locator('#truste-consent-required').click();


  //Cloud Foundry >> Spaces >> dev space name >> Space Members >> Add members >> Paste bulk email >> Give Space Developer role
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/1684622a-6a26-475a-8948-efdecd3cfc7f/spaces');

  const SpaceTileLink = page.locator('.cf-uis--spaceTileControl .cf-uis--tileHeader');
  await SpaceTileLink.waitFor({ state: 'visible' });
  await SpaceTileLink.click();

  const SpaceMembersLink  = await page.locator('a[title="Space Members"]');
  await SpaceMembersLink.waitFor({ state: 'visible' });
  await SpaceMembersLink.click();
  
  const AddSpaceMembersButton = await page.locator('#__xmlview2--addSpaceMembers');
  await AddSpaceMembersButton.waitFor({ state: 'visible' });

  //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log(fileContent);
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Example: log each line
    for (const line of lines) {
      await page.waitForSelector('table#__xmlview2--spaceMembers-listUl');
      const DeleteIcon = await page.getByRole("row").filter({hasText: line}).locator('button', {hasText:'Delete'});
      await DeleteIcon.waitFor({ state: 'visible', timeout: 5000 });
      await DeleteIcon.click();

        //Confirm removal in the pop up dialog
      const RemoveButton = await page.locator(".sapMDialogFooter").getByRole('button', { name: 'Delete' });
      await RemoveButton.waitFor({ state: 'visible' , timeout: 5000 });
      await RemoveButton.click();
    }
});

test('-V2-Add CF: Role Collections', async ( {page}) => {
  //Gen AI CodeJam Tile
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/a5a420d8-58c6-4820-ab11-90c7145da589/rolecollections');
  await page.locator('#truste-consent-required').click();

  //Click on the More button to load more role collections
  const growingListTrigger = page.locator('div.sapMGrowingListTrigger');    
  await growingListTrigger.waitFor({ state: 'visible' });    
  await growingListTrigger.click();
  
  //Look for row containing 'CodeJam' and click on the arrow icon
  const CodeJamRoleCollectionRow = await page.getByRole('row').filter({ hasText: 'CodeJam' });
  await CodeJamRoleCollectionRow.waitFor({ state: 'visible' });

  const navIcon = CodeJamRoleCollectionRow.locator("td").nth(6);
  await navIcon.waitFor({ state: 'visible' });
  await navIcon.click();

  //Added this line to ensure the page is fully loaded before clicking on the Edit button
  await page.waitForSelector('#__xmlview3');

  const EditButton = await page.getByRole('button', { name: 'Edit' });
  await EditButton.waitFor({ state: 'visible' });
  await EditButton.click();

  const UsersTab = await page.getByRole('tab', { name: 'Users' });
  await UsersTab.waitFor({ state: 'visible' });
  await UsersTab.click();
  
  //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  let index = 0;

  // Example: log each line
  for (const line of lines) {
    console.log("Processing user : " + line);
   
    const inputIDField = await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl td input').first();
    await inputIDField.waitFor({ state: 'visible' });
    await inputIDField.fill(line);

    if(index == 0){
      const idpField = await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl tr').nth(1).locator("td").nth(2).click();
      await page.locator('ul[role="listbox"]').getByText('Default identity provider').nth(0).click();
      await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl tr').nth(1).locator("td").nth(3).locator("input").fill(line); // Simulate typing
      
      const SaveButton = await page.getByRole('button', { name: 'Save' });
      await SaveButton.waitFor({ state: 'visible' });
      await SaveButton.click();
      console.log("Added user - if flow: " + line);
    }
    else{
        await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl tr').nth(1).locator("td").nth(2).click();
        const idpField = await page.locator('ul[role="listbox"] li:has-text("Default identity provider")').first();
        await idpField.waitFor({ state: 'visible' });
        await idpField.click();

        const EmailField = await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl tr').nth(1).locator("td").nth(3).locator('input');
        await EmailField.waitFor({ state: 'visible' });
        await EmailField.fill(line);

        const SaveButton = await page.getByRole('button', { name: 'Save' });
        await SaveButton.waitFor({ state: 'visible' });
        await SaveButton.click();
        console.log("Added user - else flow : " + line);
    }
      const EditButton = await page.getByRole('button', { name: 'Edit' });
      await EditButton.waitFor({ state: 'visible' });
      await EditButton.click();
  
      index++;
  }

});

test('Add CF:Role Collections', async ( {page}) => {
  //Gen AI CodeJam Tile
  //Security >> CodeJamParticipant Role >> Add email ids

  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/a5a420d8-58c6-4820-ab11-90c7145da589/rolecollections');
  await page.locator('#truste-consent-required').click();

  await page.locator('#__xmlview0--roleCollectionsList-triggerList').click();
  const CodeJamRoleCollectionRow = await page.getByRole('row').filter({ hasText: 'CodeJam' }).locator("td").nth(6);
  await CodeJamRoleCollectionRow.waitFor({ state: 'visible' })
  await CodeJamRoleCollectionRow.click();

  const EditButton = await page.getByRole('button', { name: 'Edit' });
  await EditButton.waitFor({ state: 'visible' });
  await EditButton.click();

  const UsersTab = await page.getByRole('tab', { name: 'Users' });
  await UsersTab.waitFor({ state: 'visible' });
  await UsersTab.click();
  
  //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  //console.log(fileContent);
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  let index = 0;

  // Example: log each line
  for (const line of lines) {
    console.log("Processing user : " + line);
   
    const inputIDField = await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl td input').first();
    await inputIDField.waitFor({ state: 'visible' });
    await inputIDField.fill(line);

    if(index == 0){
      const idpField = await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl tr').nth(1).locator("td").nth(2).click();
      await page.locator('ul[role="listbox"]').getByText('Default identity provider').nth(0).click();
      // await dropdownValue.waitFor({ state: 'visible' });
      // await dropdownValue.click();

      await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl tr').nth(1).locator("td").nth(3).locator("input").fill(line); // Simulate typing
      
      const SaveButton = await page.getByRole('button', { name: 'Save' });
      await SaveButton.waitFor({ state: 'visible' });
      await SaveButton.click();
      console.log("Added user : " + line);
    }
    else{
        await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl tr').nth(1).locator("td").nth(2).click();
        const idpField = await page.locator('ul[role="listbox"] li:has-text("Default identity provider")').first();
        await idpField.waitFor({ state: 'visible' });
        await idpField.click();

        const EmailField = await page.locator('table#__xmlview3--rolecollectionsDetailUsersList-listUl tr').nth(1).locator("td").nth(3).locator('input');
        await EmailField.waitFor({ state: 'visible' });
        await EmailField.fill(line);

        const SaveButton = await page.getByRole('button', { name: 'Save' });
        await SaveButton.waitFor({ state: 'visible' });
        await SaveButton.click();
        console.log("Added user : " + line);
    }
      const EditButton = await page.getByRole('button', { name: 'Edit' });
      await EditButton.waitFor({ state: 'visible' });
      await EditButton.click();
  
      index++;
  }

});


test('Delete CF:Role Collections', async ( {page}) => {
  //CAP CodeJam Tile
  //https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/13f4f274-4515-4c67-8274-cbde80a4e744/rolecollections
  //Security >> CodeJamParticipant Role >> Add email ids
  //Gen AI CodeJam Tile
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/a5a420d8-58c6-4820-ab11-90c7145da589/rolecollections');
  await page.locator('#truste-consent-required').click();

  const CodeJamRoleCollectionRow = await page.getByRole('row').filter({ hasText: 'CodeJam' }).locator('#__item9-__clone4-TypeCell')
  await CodeJamRoleCollectionRow.waitFor({ state: 'visible' })
  await CodeJamRoleCollectionRow.click();

  const UsersTab = await page.getByRole('tab', { name: 'Users' });
  await UsersTab.waitFor({ state: 'visible' });
  await UsersTab.click();

  //await page.waitForResponse('https://emea.cockpit.btp.cloud.sap/ajax/275320f9-4c26-4622-8728-b6f5196075f5/cf-us10/13f4f274-4515-4c67-8274-cbde80a4e744/getRoleCollectionUsersCall/13f4f274-4515-4c67-8274-cbde80a4e744/loadRoleCollectionDetailUsers?rolecollection=CodeJam');

  const EditButton = await page.getByRole('button', { name: 'Edit' });
  await EditButton.waitFor({ state: 'visible' });
  await EditButton.click();

  //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  console.log(fileContent);
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    // Example: log each line
    for (const line of lines) {
      await page.getByRole("row").filter({hasText: line}).locator('span[title="Remove assignment"]').click();

      //Confirm removal in the pop up dialog
      const RemoveButton = await page.getByRole('button', { name: 'Remove' });
      await RemoveButton.waitFor({ state: 'visible' });
      await RemoveButton.click();
      
    }

    const SaveButton = await page.getByRole('button', { name: 'Save' });
    await SaveButton.waitFor({ state: 'visible' });
    await SaveButton.click();

});


test('Create Users from Security > Users', async ( {page}) => {
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/a5a420d8-58c6-4820-ab11-90c7145da589/usersOverview&//');

  await page.locator('#truste-consent-required').click();
  
  //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  //console.log(fileContent);
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  for (const line of lines) {
    await page.locator('#__xmlview1--overviewPageUsers-headerTitle').getByRole('button', { name: 'Create' }).click();
    await page.locator('.sapMDialog').waitFor({ state: 'visible' });
    const inputSelector = '#__xmlview1--inputUserName-inner'; // your input selector

    // Use type() to simulate real typing (fires all events)
    await page.locator(inputSelector).fill(line); // Simulate typing
    //await page.keyboard.press('Tab', { delay: 1000 }); // Move to the next field
    console.log("Creating :" + line);
    await page.waitForResponse('https://emea.cockpit.btp.cloud.sap/ajax/275320f9-4c26-4622-8728-b6f5196075f5/cf-eu10-004/a5a420d8-58c6-4820-ab11-90c7145da589/getShadowUsersCall/a5a420d8-58c6-4820-ab11-90c7145da589/'+line, { timeout: 5000 });
    await page.locator(inputSelector).evaluate((el) => el.blur());
   
    // await page.locator(inputSelector).fill(line);
    //Manually dispatch input and change events
    await page.evaluate((selector) => {
      const input = document.querySelector(selector);
      if (input) {
        input.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
      }
    }, inputSelector);

    // await page.locator('#__xmlview1--inputUserName-inner').fill(line);
   
    await page.locator('#__xmlview1--selectIDPName-arrow').click();
    const idpField = await page.locator('ul[role="listbox"] li:has-text("Default identity provider")').nth(1);
    await idpField.waitFor({ state: 'visible' });
    await idpField.click(); 

    await page.locator('#__xmlview1--newUserEmailName-inner').fill(line);
    const createButton = await page.locator('.sapMDialogFooter').getByRole('button', { name: 'Create' }).first();
    await createButton.waitFor({ state: 'visible' });
    await createButton.click();
    console.log("Created :" + line);
  }

});


test('Delete Users from Security > Users', async ( {page}) => {
  //CAP CodeJam url
  //await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/13f4f274-4515-4c67-8274-cbde80a4e744/usersOverview&//');
  //Gen AI CodeJam url
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/a5a420d8-58c6-4820-ab11-90c7145da589/usersOverview&//');
  await page.locator('#truste-consent-required').click();

  //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  //console.log(fileContent);
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);

  for (const line of lines) {
    const moreLink = page.locator('#__xmlview1--usersTable-trigger-content');
    while(await moreLink.isVisible()){
      await moreLink.click();
    }
    await page.getByRole("row").filter({hasText: line}).locator('button', {hasText:'Delete user'}).click();
    //Confirm removal in the pop up dialog
    const RemoveButton = await page.locator(".sapMDialogFooter").getByRole('button', { name: 'Delete' });
    await RemoveButton.waitFor({ state: 'visible' });
    await RemoveButton.click();
    console.log("Deleted user : " + line);
  }
});


test('-V2-Delete Users from Security > Users', async ( {page}) => {
  //CAP CodeJam url
  //await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/13f4f274-4515-4c67-8274-cbde80a4e744/usersOverview&//');
  //Gen AI CodeJam url
  await page.goto('https://emea.cockpit.btp.cloud.sap/cockpit/#/globalaccount/275320f9-4c26-4622-8728-b6f5196075f5/subaccount/a5a420d8-58c6-4820-ab11-90c7145da589/usersOverview&//');
  await page.locator('#truste-consent-required').click();

  //Read emails from a file and paste them in the input field
  const filePath = './tests/lib/emails.txt'; // Replace with your file path
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  //console.log(fileContent);
  const lines = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
  
  let countDeletedUsers = 0;
  //Click on the Select multiple users button
  await page.getByRole('button', { name: 'Select multiple users' }).click();

  //Click on more link to load all users
  const moreLink = page.locator('#__xmlview1--usersTable-trigger-content');
  await moreLink.waitFor({ state: 'visible' });
  while(await moreLink.isVisible()){
    await moreLink.click();
  }

  for (const line of lines) {
    const userRow = page.getByRole("row").filter({hasText: line});
    if(await userRow.isVisible()){
      const checkbox = userRow.getByRole('checkbox');
      await checkbox.check();
      console.log("Selected user : " + line);
      countDeletedUsers++;
    }
    else{
      console.log("User not found or already deleted: " + line);
      continue;
    }
  }

  await page.getByRole('toolbar').getByRole('button', { name: 'Delete' }).click();
  
  //Confirm Delete in the pop up dialog
  await page.locator("#confirmDelete").locator('button:has-text("Delete")').click();
  console.log("Deleted " + countDeletedUsers + " users");
});
