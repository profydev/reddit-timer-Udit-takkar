import describeOnBranches from '../utils/describeOnBranches';

describeOnBranches('footer')('Footer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Uses footer tag', () => {
    cy.get('footer');
  });

  it('Contains link to profy.dev/employers', () => {
    cy
      .get('footer')
      .contains('profy.dev')
      .and('have.attr', 'href')
      .and('eq', 'https://profy.dev/employers');
  });

  it('Contains "Terms & Privacy" link', () => {
    cy
      .get('footer')
      .contains('Terms & Privacy')
      .click();
    cy.url().should('equal', `${Cypress.config().baseUrl}/terms`);
  });
});
