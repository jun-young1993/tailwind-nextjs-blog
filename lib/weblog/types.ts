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