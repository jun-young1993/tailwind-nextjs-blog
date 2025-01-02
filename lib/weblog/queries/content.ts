export const getRepositoryContent = `
  query GetRepositoryContents($repository: String!, $path: String!) {
    getRepositoryContents(repository: $repository, path: $path) {
      name
      path
    }
  }
`