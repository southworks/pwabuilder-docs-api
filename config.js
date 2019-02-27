module.exports = {
    port: process.env.PORT || 3000,
    repositoryIndexPath: process.env.REPOSITORYINDEXPATH || "./github-filefetcher/snippets.json",
    snippetsURL: process.env.SNIPPETSURL || "https://api.github.com/repos/southworkscom/pwabuilder-snippits/contents/snippets.json?ref=add/snippits-index",
    baseGitHubUrl: process.env.BASEGITHUBURL || "https://api.github.com/repos/",
    ownerGitHubUrl:  process.env.OWNERGITHUBURL || "pwa-builder/",
    repoGitHubUrl: process.env.REPOGITHUBURL || "pwabuilder-snippits/",
    endpointGithubUrl: process.env.ENDPOINTGITHUBURL || "contents/"
}

///https://api.github.com/repos/southworkscom/pwabuilder-snippits/contents/snippets.json?ref=gh-pages

      