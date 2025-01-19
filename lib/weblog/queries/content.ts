export const getRepositoryContent = `
  query GetRepositoryContents($repository: String!, $path: String!) {
    getRepositoryContents(repository: $repository, path: $path) {
      name
      path
    }
  }
`
export const getPostsQuery = `
    query GetPosts($limit: Float, $page: Float) {
        getPosts(limit: $limit, page: $page) {
            pagination {       # 페이징 정보
                total          # 총 데이터 개수
                page           # 현재 페이지 번호
                limit          # 페이지 크기
                totalPages     # 총 페이지 수
            }
            data {             # 데이터 배열
                sha
                filename
                content
                updatedAt
            }
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