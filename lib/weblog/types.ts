import {string} from "zod";

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
    id: string
    title: string
    content: string
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

export type Tag = {
    id: string
    name: string
    color: string
}
export interface TagsWithPostCount extends Tag {
    postCount: number
}
export type TagsWithPostCountOperation = {
    data: { getTagsWithPostCount: [TagsWithPostCount]},
}
