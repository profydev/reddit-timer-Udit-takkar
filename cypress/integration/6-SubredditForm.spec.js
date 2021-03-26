import describeOnBranches from '../utils/describeOnBranches';

describeOnBranches('subreddit-form')('Subreddit Form', () => {
  it('Updates URL with input value on submit', () => {
    cy.visit('/search/javascript');

    cy.get('input')
      .clear()
      .type('reactjs');

    cy.contains('button', 'SEARCH', { matchCase: false })
      .click();

    cy.url().should('equal', `${Cypress.config().baseUrl}/search/reactjs`);
  });

  it('Input value updates when header link is clicked', () => {
    cy.visit('/search/reactjs');

    cy.get('input')
      .should('have.value', 'reactjs');

    cy.get('header')
      .contains('Search')
      .click();

    cy.get('input')
      .should('have.value', 'javascript');
  });
});
