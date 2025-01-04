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

export type WebLogPostOperation = {
    data: { getPost: WeblogPost[] }
    variables: {
        limit?: number
    }
}