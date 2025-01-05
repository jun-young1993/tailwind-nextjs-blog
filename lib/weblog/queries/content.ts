export const getRepositoryContent = `
  query GetRepositoryContents($repository: String!, $path: String!) {
    getRepositoryContents(repository: $repository, path: $path) {
      name
      path
    }
  }
`
export const getPostsQuery = `
    query GetPosts($limit: Float) {
        getPosts(limit: $limit) {
             sha
            filename
            content
            updatedAt
        }
    }
`

export const getPostQuery = `
    query GetPost($id: String!) {
        getPost(id: $id) {
            sha
            filename
            content
            updatedAt
        }
    }
`

export const getLatestCommits = `
    query GetCommits($repository: String!, $path: String!) {
        getCommits(repository: $repository, path: $path) {
            sha
            commit {
                committer {
                    name
                    date
                    email
                }
            }
            detail {
                files {
                    sha
                    filename
                    status
                    content
                }
            }
        }
    }
    
`