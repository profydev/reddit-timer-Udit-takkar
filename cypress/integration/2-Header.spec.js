import describeOnBranches from '../utils/describeOnBranches';

describeOnBranches('header')('Header', () => {
  beforeEach(() => {
    cy.visit('/#some-hash');
  });

  it('Uses header tag', () => {
    cy.get('header');
  });

  it('Contains logo with link to home page', () => {
    cy.get('header')
      .get('a')
      .first()
      .click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/`);
  });

  it('Contains "Search" link that includes the default subreddit "javascript"', () => {
    cy.get('header')
      .contains('Search')
      .click();
    cy.url()
      .should('include', `${Cypress.config().baseUrl}/search`)
      .and('include', 'javascript');
  });

  it('Scrolls to "How it works" when clicking link in header', () => {
    cy.get('header')
      .contains('How it works')
      .click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/#how-it-works`);
  });

  it('Scrolls to "About" when clicking link in header', () => {
    cy.get('header')
      .contains('About')
      .click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/#about`);
  });
});
