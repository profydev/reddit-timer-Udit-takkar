import describeOnBranches from '../utils/describeOnBranches';

describeOnBranches('info-section')('Info Section', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Contains links to profy.dev and profy.dev/employers', () => {
    cy.contains(/This app was created during a course/)
      .contains('profy.dev')
      .and('have.attr', 'href')
      .and('eq', 'https://profy.dev');

    cy.contains(/This app was created during a course/)
      .contains(/Click here for more information/)
      .and('have.attr', 'href')
      .and('eq', 'https://profy.dev/employers');
  });

  it('Scrolls to "How it works" when clicking link in header', () => {
    cy.get('header')
      .contains('How it works')
      .click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.window().then(($window) => {
      // scroll should be greater than any number
      expect($window.scrollY).to.be.greaterThan(100);
    });
  });

  it('Scrolls to "About" when clicking link in header', () => {
    cy.get('header')
      .contains('About')
      .click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.window().then(($window) => {
      // scroll should be greater than any number
      expect($window.scrollY).to.be.greaterThan(100);
    });
  });
});
