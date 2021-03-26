const branches = [
  'create-app-skeleton',
  'header',
  'footer',
  'hero-section',
  'info-section',
  'subreddit-form',
  'load-the-data',
  'heatmap',
  'posts-table',
  'readme',
];

function describeOnBranches(startBranch) {
  const startBranchIndex = branches.indexOf(startBranch);

  if (startBranchIndex === -1) {
    throw new Error('start branch for describeOnBranches is unknown. Typo?');
  }

  const branchName = Cypress.env('branch-name');

  // this is not a pull request, probably local machine
  // tests should run
  if (!branchName) {
    return describe;
  }

  const currentBranchIndex = branches.indexOf(branchName);
  const isNotFeatureBranch = !!branchName.match(/chore|fix/);

  // branch name is unknown, don't run tests
  if (currentBranchIndex === -1 || isNotFeatureBranch) {
    return xdescribe;
  }

  if (startBranchIndex <= currentBranchIndex) {
    return describe;
  }

  return xdescribe;
}

export default describeOnBranches;
