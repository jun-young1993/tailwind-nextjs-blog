import { ApolloClient } from "@apollo/client"
import {
    getLatestCommits,
    getPostQuery,
    getPostsQuery,
    getRepositoryContent,
    getTagsWithPostCountQuery
} from "./queries/content"
import { isWeblogError } from "./type-guards"
import {
    TagsWithPostCount,
    TagsWithPostCountOperation,
    WebLogCommitOperation,
    WeblogFiles,
    WeblogPost,
    WebLogPostOperation,
    WeblogPosts,
    WebLogPostsOperation
} from "./types"

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never

const endpoint = 'http://localhost:3000/graphql/post'
const repository = 'Obsidian'
const path = 'blog'


export async function weblogFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables,
}: {
  cache?: RequestCache
  headers?: HeadersInit
  query: string
  tags?: string[]
  variables?: ExtractVariables<T>
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(endpoint,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify({
          ...(query && { query }),
          variables: {
            ...(variables && variables)
          }
        }),
        cache,
        ...(tags && { next: { tags } })
    })
    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (error) {
    if(isWeblogError(error)){
        throw {
            cause: error.cause?.toString() || 'unknown',
            status: error.status || 500,
            message: error.message,
            query
          };
    }
    throw error
  }
}


export async function getPosts(variables: WebLogPostsOperation['variables']): Promise<WeblogPosts> {
    const response = await weblogFetch<WebLogPostsOperation>({
        query: getPostsQuery,
        cache: 'no-store',
        variables: variables
    })
    console.log("=>(fetch.ts:73) response", response);
    return response.body.data.getPosts
}

export async function getPost(variables: WebLogPostOperation['variables']): Promise<WeblogPost> {
    const response = await weblogFetch<WebLogPostOperation>({
        query: getPostQuery,
        cache: 'no-store',
        variables: variables
    })
    return response.body.data.getPost
}

export async function getTagsWithPostCount(): Promise<TagsWithPostCountOperation['data']['getTagsWithPostCount']> {
    const response = await weblogFetch<TagsWithPostCountOperation>({
        query: getTagsWithPostCountQuery,
        cache: 'no-store',
    })
    console.log("=>(fetch.ts:106) response.body", response.body);
    return response.body.data.getTagsWithPostCount
}

