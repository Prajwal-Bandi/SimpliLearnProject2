import LoginPage from '../pages/LoginPage'

const loginPage = new LoginPage()
let testData

describe('HSBC Login Test Scenario', () => {

  before(() => {
    cy.fixture('example').then((data) => {
      testData = data
    })
  })

  beforeEach(() => {
    loginPage.openHomePage()
    loginPage.closeCookieBanner()
  })

  it('1. Open HSBC Homepage', () => {
    cy.url().should('include', 'hsbc.co.in')
  })

  it('2. Validate HSBC Bank Logo', () => {
    loginPage.validateLogo()
  })

  it('3. Validate Home Page Title', () => {
    loginPage.validateTitle('HSBC India - Credit Cards')
  })

  it('4. Click on Login Button', () => {
    loginPage.openOnlineBankingMenu()
    loginPage.clickLogin()
  })

  it('5. Validate Log On Header in Login Page', () => {
    loginPage.validateLogOnButton()
  })

  it('6. Check Continue Button is Available', () => {
  loginPage.validateContinueButtonExists();
 })


  it('7. Validate Continue Button is Disabled Initially', () => {
    loginPage.clickLogin()
    cy.wait(3000);
    loginPage.clickContinueToLogonBrowser()
  })

  it('8. Type Random Email in Username Field', () => {
    cy.visit('https://www.hsbc.co.in/security/');
    loginPage.typeUsername(testData.username);
  })

  it('9. Check Continue Button is Enabled After Typing Username', () => {
    loginPage.validateContinueButtonEnabled()
  })

  it('10. Validate Remember Me Checkbox is Not Checked by Default', () => {
    cy.visit('https://www.hsbc.co.in/security/');
    loginPage.validateRememberMeUnchecked();
  })

  it('11. Validate Tooltip is Present on Page', () => {
    loginPage.validateTooltipVisible()
  })

  it('12. Click on the Tooltip', () => {
    cy.visit('https://www.hsbc.co.in/security/');
    loginPage.clickTooltip()
  })  

  it('13. Validate Username Header in Pop-Up', () => {
    cy.visit('https://www.hsbc.co.in/security/');
    loginPage.validatePopupHeader()
  })

  it('14. Validate Close Button in Pop-Up', () => {
    loginPage.validatePopupCloseButton()
  })

  it('15. Click on Close Button in Pop-Up', () => {
    loginPage.clickPopupClose()
  })
})
