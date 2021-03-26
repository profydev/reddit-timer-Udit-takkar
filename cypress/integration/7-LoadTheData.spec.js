import describeOnBranches from '../utils/describeOnBranches';

describeOnBranches('load-the-data')('Load the Data', () => {
  before(() => {
    cy.stubFetch();
  });

  beforeEach(() => {
    cy.server();
    cy.initMockRedditAPI();
  });

  it('Calls the reddit API 5 times with correct URL to get the top 500 posts', () => {
    cy.visitWithStubbedFetch('/search/javascript');

    // check if all requests have been sent (see /cypress/support/commands for aliases)
    cy.wait('@fetch-reddit-top-posts-page-1');
    cy.wait('@fetch-reddit-top-posts-page-2');
    cy.wait('@fetch-reddit-top-posts-page-3');
    cy.wait('@fetch-reddit-top-posts-page-4');
    cy.wait('@fetch-reddit-top-posts-page-5');
  });
});
