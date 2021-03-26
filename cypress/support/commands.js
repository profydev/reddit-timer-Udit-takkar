// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// fetch polyifll approach taken from https://github.com/cypress-io/cypress-example-recipes/blob/master/examples/stubbing-spying__window-fetch/cypress/integration/polyfill-fetch-from-tests-spec.js
let polyfill;

Cypress.Commands.add('stubFetch', () => {
  if (polyfill) {
    return;
  }
  // grab fetch polyfill from remote URL, could be also from a local package
  const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
  cy.request(polyfillUrl)
    .then((response) => {
      polyfill = response.body;
    });
});

Cypress.Commands.add('visitWithStubbedFetch', () => {
  cy.visit('/search/javascript', {
    onBeforeLoad: (win) => {
      // eslint-disable-next-line no-param-reassign
      delete win.fetch;
      // since the application code does not ship with a polyfill
      // load a polyfilled "fetch" from the test
      win.eval(polyfill);
      // eslint-disable-next-line no-param-reassign
      win.fetch = win.unfetch;
    },
  });
});

Cypress.Commands.add('initMockRedditAPI', () => {
  cy.server();
  cy.route('GET', 'https://www.reddit.com/r/javascript/top.json?t=year&limit=100', 'fixture:reddit-response-1.json')
    .as('fetch-reddit-top-posts-page-1');
  cy.route('GET', 'https://www.reddit.com/r/javascript/top.json?t=year&limit=100&after=t3_drl1d6', 'fixture:reddit-response-2.json')
    .as('fetch-reddit-top-posts-page-2');
  cy.route('GET', 'https://www.reddit.com/r/javascript/top.json?t=year&limit=100&after=t3_ccg6no', 'fixture:reddit-response-3.json')
    .as('fetch-reddit-top-posts-page-3');
  cy.route('GET', 'https://www.reddit.com/r/javascript/top.json?t=year&limit=100&after=t3_caufp8', 'fixture:reddit-response-4.json')
    .as('fetch-reddit-top-posts-page-4');
  cy.route('GET', 'https://www.reddit.com/r/javascript/top.json?t=year&limit=100&after=t3_e8o8oz', 'fixture:reddit-response-5.json')
    .as('fetch-reddit-top-posts-page-5');
});

Cypress.Commands.add('waitForRedditRequests', () => {
  cy.wait([
    '@fetch-reddit-top-posts-page-1',
    '@fetch-reddit-top-posts-page-2',
    '@fetch-reddit-top-posts-page-3',
    '@fetch-reddit-top-posts-page-4',
    '@fetch-reddit-top-posts-page-5',
  ]);
});
