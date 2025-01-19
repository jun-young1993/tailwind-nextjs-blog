export type WeblogFiles = {
    name: string
    path: string
}

export type WeblogFile = {
    filename: string
    status: 'added' | 'modified'
    content: string
}
export type WeblogCommitDetail = {
    files: WeblogFile[]
}
export type WeblogCommit = {
    sha: string
    detail: WeblogCommitDetail
}

export type WebLogCommitOperation = {
    data: { getCommits: WeblogCommit[] }
}
export type WeblogPost = {
    sha: string
    content: string
    filename: string
    createdAt: string
    updatedAt: string
}
export type PaginationInfo = {
    total: number
    page: number
    limit: number
    totalPages: number
}
export type WeblogPosts = {
    data: WeblogPost[],
    pagination: PaginationInfo
}
export type WebLogPostsOperation = {
    data: {
        getPosts: WeblogPosts
    }
    variables: {
        limit?: number
        page?: number
    }
}

export type WebLogPostOperation = {
    data: { getPost: WeblogPost }
    variables: {
        id: string
    }
}
