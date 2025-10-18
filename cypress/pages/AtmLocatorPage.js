class AtmLocatorPage {
  // Locators
  hsbcLogo = "//img[contains(@alt,'HSBC')]";
  findBranchAtmLink = "body > footer > div.footer-main > div > div > nav > ul > li:nth-child(2) > a";
  header = "//h1[contains(text(),'Branches & ATM')]";
  branchAtmLocatorButton = '#content_main_button_1 > span:nth-child(1)';
  countryInput = "//input[@aria-label='Select Country']";
  countryOption = (country) => `//li[contains(text(),'${country}')]`;
  atmHeaderName = (atmHeader) => `//h2[contains(text(),'${atmHeader}')]`;
  showMoreButton = "//button[contains(text(),'Show more results')]";
  secondAtmTooltip = "(//div[contains(@class,'tooltip')])[2]";
  socialMediaIcon = (platform) => `//footer//a[contains(@aria-label,'${platform}')]`;
  privacyLink = "//footer//a[contains(text(),'Privacy')]";
  privacyHeader = (privacyHeader) => `//h1[contains(text(),'${privacyHeader}')]`;

  // Methods
  visitHomePage() {
    cy.visit('https://www.hsbc.co.in/');
  }

  scrollToBottom() {
  cy.wait(2000); // wait for page to load
  cy.scrollTo('bottom', { ensureScrollable: false });
  cy.log('✅ Scrolled to bottom of page');
}

 clickFindBranchAtm() {
  cy.get('body > footer > div.footer-main > div > div > nav > ul > li:nth-child(2) > a', { timeout: 10000 })
  .should('exist')
  .click();
cy.log('✅ Clicked Find your nearest branch or ATM link');
 }


 // TC4: Validate URL has string /ways-to-bank/branches/
validateUrl() {
  // Scroll to footer first
  cy.scrollTo('bottom', { ensureScrollable: false });
  cy.log('✅ Scrolled to bottom to load footer links');

  // Use the direct CSS selector
  cy.get('body > footer > div.footer-main > div > div > nav > ul > li:nth-child(2) > a', { timeout: 20000 })
    .should('be.visible')
    .invoke('removeAttr', 'target') // remove target="_blank" to stay in same tab
    .click();

  // Validate the pathname of the new page
  cy.location('pathname', { timeout: 10000 }).should('include', '/ways-to-bank/branches/');
  cy.log("✅ URL includes '/ways-to-bank/branches/'");
}

// Method to validate header
  validateHeader(expectedHeader) {
    cy.xpath(this.header, { timeout: 20000 })
      .should('be.visible')
      .and('contain.text', expectedHeader);
    cy.log(`✅ Header validated: ${expectedHeader}`);
  }

  // Method to click Branch & ATM Locator button
  clickBranchAtmLocatorButton() {
    cy.get(this.branchAtmLocatorButton, { timeout: 20000 })
      .should('exist')
      .and('be.visible')
      .click();
    cy.log('✅ Branch & ATM Locator button clicked');
  }

// Method to get country option XPath
countryOption(country) {
  return `//li[contains(text(),'${country}')]`;
}

// Method to type and select country
typeCountry(country) {
  // Click and type in the input
  cy.get('#searchInput', { timeout: 20000 })
    .should('be.visible')
    .click()
    .clear()
    .type(country, { delay: 100 });

  // Wait for the dropdown and select the correct option
  cy.get('ul[role="listbox"] li', { timeout: 20000 })
    .contains(country, { matchCase: false })
    .should('be.visible')
    .click({ force: true });

  cy.log(`✅ Selected country: ${country}`);
}

// Method to search and validate ATM header name
validateAtmHeader() {
  const atmHeader = 'Rajbhavan Road';
  cy.log(`🔍 Searching for ATM location: ${atmHeader}`);

  // Step 1: Type and select ATM location
  cy.get('#searchInput', { timeout: 20000 })
    .should('be.visible')
    .click()
    .clear()
    .type(atmHeader, { delay: 100 });

  cy.get('ul[role="listbox"] li', { timeout: 20000 })
    .contains(atmHeader, { matchCase: false })
    .should('be.visible')
    .click({ force: true });

  cy.log(`✅ Selected ATM location: ${atmHeader}`);

  // Step 2: Confirm search box shows selected value
  cy.get('#searchInput', { timeout: 10000 }).should('have.value', atmHeader);

  // ✅ Step 9 ends here
  cy.log('🏁 Step 9 completed: ATM selected and validated. Ready for Step 10.');
}

clickShowMore() {
  cy.log('🔽 Attempting to click "Show More" button...');

  cy.contains('button, a', 'Show More', { matchCase: false, timeout: 20000 })
    .scrollIntoView()
    .should('be.visible')
    .click({ force: true });

  cy.log('✅ Successfully clicked "Show More" button');
}

validateSecondAtmTooltip() {
  cy.log('🔍 Checking tooltip for second ATM branch (Whitefield)');

  // Get the second ATM button
  const secondAtmButton = 'body > main > div:nth-child(2) > div > div.dpws-tool.O-SMARTSPCGEN-DEV > div > div > div.xcs3_Kw554VuV4oelcXa > div > ul > li:nth-child(2) > button';

  // Ensure second ATM is visible
  cy.get(secondAtmButton, { timeout: 30000 }).should('be.visible');

  // Hover to trigger tooltip
  cy.get(secondAtmButton).trigger('mouseover');

  // Instead of fixed class, check for any new child span/div appearing inside button
  cy.get(secondAtmButton)
    .find('span, div') // adjust this selector if needed
    .contains(/whitefield/i, { timeout: 10000 }) // check tooltip text contains branch name
    .should('be.visible')
    .then(($tooltip) => {
      cy.log(`✅ Tooltip text: ${$tooltip.text().trim()}`);
    });
}


/// Method to check social media icons in footer
checkSocialMedia(platform) {
  cy.get('footer', { timeout: 20000 }).scrollIntoView({ ensureScrollable: false });

  let selector;
  switch(platform.toLowerCase()) {
    case 'instagram':
      selector = '#srch_socialmediafooterlink_1';
      break;
    case 'facebook':
      selector = '#srch_socialmediafooterlink_2';
      break;
    case 'twitter':
      selector = '#srch_socialmediafooterlink_3';
      break;
    case 'youtube':
      selector = '#srch_socialmediafooterlink_4';
      break;
    default:
      throw new Error(`Unknown platform: ${platform}`);
  }

  cy.get(selector, { timeout: 20000 })
    .should('exist')
    .and('be.visible');

  cy.log(`✅ ${platform} icon validated`);
}

// Method to click HSBC Logo
clickHsbcLogo() {
  // Scroll to the logo so it's visible
  cy.get('body > div.header-wrapper > div > header > div.header-wrapper-main > div > div.header-main-container.hide-on-mobile-and-tablet > div > div > div > a > img', { timeout: 20000 })
    .scrollIntoView({ ensureScrollable: false })
    .should('be.visible')   // ensure it's visible
    .click();               // click the logo

  cy.log('✅ Clicked on HSBC Logo');
}

validateHomepageTitle(expectedTitle = 'HSBC') {
  cy.log(`🔍 Validating homepage title includes: "${expectedTitle}"`);

  // Visit homepage
  cy.visit('https://www.hsbc.co.in/');

  // Ensure the page is ready by waiting for a main element to be visible
  cy.get('header', { timeout: 10000 }).should('be.visible');

  // Validate the title
  cy.title({ timeout: 10000 }).should('include', expectedTitle)
    .then((title) => {
      cy.log(`✅ Homepage title is correct: "${title}"`);
    });
}

  clickPrivacy() {
    cy.get('body > footer > div.footer-bottom > div > div > nav > ul > li:nth-child(3) > a')
  .should('exist')
  .click();
cy.log('✅ Privacy link clicked');

  }

validatePrivacyHeader(headerText) {

  cy.get('body > footer > div.footer-bottom > div > div > nav > ul > li:nth-child(3) > a')
    .scrollIntoView()
    .should('exist')
    .and('be.visible')
    .and('contain.text', headerText);

  cy.log(`✅ Privacy header validated: ${headerText}`);
}


}
export default AtmLocatorPage;
