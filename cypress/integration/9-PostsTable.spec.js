import describeOnBranches from '../utils/describeOnBranches';

describeOnBranches('posts-table')('Posts Table', () => {
  before(() => {
    cy.stubFetch();
  });

  beforeEach(() => {
    cy.initMockRedditAPI();
    cy.visitWithStubbedFetch('/search/javascript');
    cy.waitForRedditRequests();
    // click Monday 2 am, the first "4" in the heatmap
    cy.contains(/^4$/)
      .click();
  });

  describe('post title', () => {
    it('links to Reddit posts', () => {
      cy.contains(/The new Babel release gives support/)
        .and('have.attr', 'href')
        .and('match', /https:\/\/(www.)?reddit.com\/r\/javascript\/comments\/er5hqm\/the_new_babel_release_gives_support_for\/?/);
    });

    it('link opens in new tab', () => {
      cy.contains(/The new Babel release gives support/)
        .and('have.attr', 'target')
        .and('eq', '_blank');
    });

    it('link complies to ESLint rule react/jsx-no-target-blank', () => {
      cy.contains(/The new Babel release gives support/)
        .and('have.attr', 'rel')
        .and('eq', 'noopener noreferrer');
    });
  });

  describe('post author', () => {
    it('links to Reddit posts', () => {
      cy.contains('abazi')
        .and('have.attr', 'href')
        .and('eq', 'https://reddit.com/u/abazi');
    });

    it('link opens in new tab', () => {
      cy.contains('abazi')
        .and('have.attr', 'target')
        .and('eq', '_blank');
    });

    it('link complies to ESLint rule react/jsx-no-target-blank', () => {
      cy.contains('abazi')
        .and('have.attr', 'rel')
        .and('eq', 'noopener noreferrer');
    });

    it('is not a link when [deleted]', () => {
      cy.contains('[deleted]')
        .and('have.prop', 'tagName')
        .and('not.eq', 'a');
    });
  });
});
