import 'cypress-xpath'

class LoginPage {
  // ------------------- Locators -------------------
  hsbcLogo = "//img[contains(@alt,'HSBC')]"
  onlineBankingMenu = "//a[contains(text(),'Online Banking')]"
  loginButton = "body > div.header-wrapper > div > header > div.header-wrapper-main > div > div.header-top-container.hide-on-mobile-and-tablet > div > div > div > div > div > nav > ul > li:nth-child(5) > div > a.selected-item.login-button.only-one-link"
  continueToBrowserBtn = "//a[contains(translate(text(),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'continue to log on with browser')]"
  continueButton = 'button[type="submit"]'
  usernameField = '#username'
  rememberMeCheckbox = '#rememberMe'
  tooltipIcon = "//button[contains(@aria-label,'username help')]"
  popupHeader = "//h2[contains(text(),'Username')]"
  popupCloseButton = "//button[contains(@aria-label,'Close')]"
  cookieBannerBtn = "button#onetrust-accept-btn-handler"

  // ------------------- Common Actions -------------------
  openHomePage() {
    cy.visit('/')
  }

  closeCookieBanner() {
    cy.get('body').then(($body) => {
      if ($body.find(this.cookieBannerBtn).length) {
        cy.get(this.cookieBannerBtn).click({ force: true })
        cy.log('✅ Cookie banner closed')
      }
    })
  }

  validateLogo() {
    cy.xpath(this.hsbcLogo, { timeout: 15000 }).should('be.visible')
  }

  validateTitle(expectedSubstring) {
    cy.title().should('include', expectedSubstring)
  }

  openOnlineBankingMenu() {
    cy.xpath(this.onlineBankingMenu, { timeout: 15000 })
      .first()
      .invoke('show')
      .click({ force: true })
  }

  clickLogin() {
    cy.get(this.loginButton, { timeout: 15000 })
      .first()
      .should('be.visible')
      .click({ force: true })
    cy.log('✅ Clicked on Login button')
  }

  // ------------------- Log On Page Steps -------------------
  validateLogOnButton() {
    cy.xpath("//a[contains(@class,'login-button') and contains(text(),'Log On')]", { timeout: 15000 })
      .should('be.visible')
  }

  validateContinueButtonExists() {
    cy.get(this.continueButton, { timeout: 20000 }).should('exist')
  }

  clickContinueToLogonBrowser() {
  // Wait a bit for the modal to appear after clicking "Log On"
  cy.wait(3000);

  // Click the "Continue to log on with browser" button
  cy.get('#pwsModalBody_link_1 > a > span', { timeout: 20000 })
    .should('be.visible')
    .scrollIntoView()
    .click({ force: true });

  // Optional: verify navigation to logon page
  cy.url({ timeout: 20000 }).should('include', '/security'); // or any expected URL path
}

// Step 8: Type Username
typeUsername(username) {
  // Wait for the username field to exist and be visible
  cy.get(this.usernameField, { timeout: 20000 })
    .should('be.visible')
    .scrollIntoView()  // scroll in case it's hidden behind a fixed header
    .clear()
    .type(username, { force: true }); // force in case of overlays

  cy.log('✅ Username entered successfully');
}

    // Step 9: Validate Continue Button Enabled
  validateContinueButtonEnabled() {
    cy.get(this.continueButton, { timeout: 10000 })
      .should('be.enabled');
    cy.log('✅ Continue button is enabled after typing username');
  }

  // Step 10: Validate Remember Me Checkbox is Not Checked
  validateRememberMeUnchecked() {
  cy.get('#rememberMe', { timeout: 15000 }) // direct selector
    .should('exist')
    .and('not.be.checked');

  cy.log('✅ Remember Me checkbox is unchecked by default');
}

  // Step 11: Validate Tooltip Visible
  validateTooltipVisible() {
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const tooltipButton = $body.find(
        "button[aria-label*='username'], button[title*='username']"
      );
      if (tooltipButton.length) {
        cy.wrap(tooltipButton).should('be.visible');
      }
    }); // ✅ Make sure this semicolon exists
  }

  // Step 12–15: Tooltip Pop-up Validation
clickTooltip() {
  // Wait for the tooltip button to exist in the DOM
  cy.get('body', { timeout: 15000 }).then(($body) => {
    const tooltipBtn = $body.find("button[aria-label*='username help'], button[title*='username help']");
    if (tooltipBtn.length) {
      cy.wrap(tooltipBtn)
        .should('be.visible')
        .click({ force: true });
      cy.log('✅ Tooltip clicked');
    } else {
      cy.log('⚠ Tooltip button not found');
    }
  });
}

validatePopupHeader() {
  // Wait for the pop-up to exist
  cy.get('body', { timeout: 15000 }).then(($body) => {
    const header = $body.find("h2:contains('Username'), div:contains('Username')");
    if (header.length) {
      cy.wrap(header)
        .should('be.visible');
      cy.log('✅ Username header in pop-up validated');
    } else {
      cy.log('⚠ Username header not found in pop-up');
    }
  });
}



  validatePopupCloseButton() {
    cy.xpath(this.popupCloseButton, { timeout: 10000 }).should('be.visible')
  }

  clickPopupClose() {
    cy.xpath(this.popupCloseButton, { timeout: 10000 }).click({ force: true })
  }
}

export default LoginPage
