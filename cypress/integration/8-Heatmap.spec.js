import describeOnBranches from '../utils/describeOnBranches';

describeOnBranches('heatmap')('Heatmap', () => {
  before(() => {
    cy.stubFetch();
  });

  beforeEach(() => {
    cy.initMockRedditAPI();
    cy.visitWithStubbedFetch('/search/javascript');
    cy.waitForRedditRequests();
  });

  it('Updates URL with input value on submit', () => {
    // click Monday 2 am, the first "4" in the heatmap
    cy.contains(/^4$/)
      .click();
  });
});
