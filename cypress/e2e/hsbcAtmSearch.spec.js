import AtmLocatorPage from '../pages/AtmLocatorPage';
const atmPage = new AtmLocatorPage();

describe('HSBC ATM/Branch Test Suite', () => {

  it('TC1: Open HSBC homepage', () => {
    atmPage.visitHomePage();
    cy.title().should('include', 'HSBC');
  });

  it('TC2: Scroll down to the bottom of the page', () => {
    atmPage.scrollToBottom();
  });

  it('TC3: Click Find your nearest branch or ATM link in footer', () => {
    cy.visit('https://www.hsbc.co.in/');
    atmPage.clickFindBranchAtm();
  });

  it('TC4: Validate URL has string /ways-to-bank/branches/', () => {
    cy.visit('https://www.hsbc.co.in/ways-to-bank/branches/');
    atmPage.validateUrl('/ways-to-bank/branches/');
  });

  it('TC5: Validate Header as Branches & ATM', () => {
    cy.visit('https://www.hsbc.co.in/ways-to-bank/branches/');
    atmPage.validateHeader('Branches & ATM');
  });

  it('TC6: Click on Branch & ATM Locator button', () => {
    cy.visit('https://www.hsbc.co.in/ways-to-bank/branches/');
    atmPage.clickBranchAtmLocatorButton();
  });

  it('TC7: Type country name as India', () => {
    cy.visit('https://www.hsbc.co.in/branch-finder/');
    atmPage.typeCountry('India');
  });

  it('TC8: Click on India option in drop-down', () => {
    // Already handled in typeCountry method
  });

// TC9: Search and validate ATM header
// TC9: Validate ATM Header name is showing as Rajbhavan Road
it('TC9: Validate ATM Header name is showing as Rajbhavan Road', () => {
  cy.visit('https://www.hsbc.co.in/branch-finder/');
  atmPage.validateAtmHeader('Rajbhavan Road');
});

// TC10: Visit the page (starting where TC9 left off) and click Show More
it('TC10: Click on Show More results button', () => {
  // Visit same page again (optional if you want fresh load)
  cy.visit('https://www.hsbc.co.in/branch-finder/');

  // Select the same ATM again so page is ready
  atmPage.validateAtmHeader('Rajbhavan Road');

  // Click Show More immediately
  atmPage.clickShowMore();
});

// TC11: Check second ATM branch tooltip is displayed (on the same page)
it('TC11: Check second ATM branch tooltip is displayed', () => {
  // The page is already loaded and Show More clicked from TC10
  cy.visit('https://www.hsbc.co.in/branch-finder/');

  // Select the same ATM again so page is ready
  atmPage.validateAtmHeader('Rajbhavan Road');

  // Click Show More immediately
  atmPage.clickShowMore();
  atmPage.validateSecondAtmTooltip();
});


  it('TC12: Check Instagram icon in footer', () => {
    cy.visit('https://www.hsbc.co.in/branch-finder/');
    atmPage.checkSocialMedia('Instagram');
  });

  it('TC13: Check Facebook icon in footer', () => {
    cy.visit('https://www.hsbc.co.in/branch-finder/');
    atmPage.checkSocialMedia('Facebook');
  });

  it('TC14: Check Twitter icon in footer', () => {
    cy.visit('https://www.hsbc.co.in/branch-finder/');
    atmPage.checkSocialMedia('Twitter');
  });

  it('TC15: Check Youtube icon in footer', () => {
    cy.visit('https://www.hsbc.co.in/branch-finder/');
    atmPage.checkSocialMedia('YouTube');
  });

  it('TC16: Click on HSBC Logo', () => {
    cy.visit('https://www.hsbc.co.in/branch-finder/');
    atmPage.clickHsbcLogo();
  });

it('TC17: Validate homepage by title', () => {
  atmPage.validateHomepageTitle(); // defaults to 'HSBC'
});


  it('TC18: Scroll down to bottom', () => {
    atmPage.scrollToBottom();
  });

  it('TC19: Click on Privacy link', () => {
    cy.visit('https://www.hsbc.co.in/');
    atmPage.clickPrivacy();
  });

  it('TC20: Validate Privacy Statement header', () => {
    cy.visit('https://www.hsbc.co.in/');
    atmPage.validatePrivacyHeader('Privacy Statement');
  });

});
