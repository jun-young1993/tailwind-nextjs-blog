import { ApolloClient } from "@apollo/client"
import { getRepositoryContent } from "./queries/content"
import { isWeblogError } from "./type-guards"
import { WeblogFiles } from "./types"

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never

const endpoint = 'http://localhost:3000/graphql/github'
const repository = 'Obsidian'
const path = 'blog/troubleshooting'
const GlobVariables = {
    repository,
    path
}

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
            ...GlobVariables,
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

export async function getContents(): Promise<WeblogFiles[]> {
    const response = await weblogFetch<WeblogFiles[]>({
        query: getRepositoryContent,
        cache: 'no-store',
    })

    return response.body
}