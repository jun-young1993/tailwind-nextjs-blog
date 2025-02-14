'use client'

import { usePathname } from 'next/navigation'
import { formatDate } from 'pliny/utils/formatDate'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { WeblogPosts, TagsWithPostCount } from '../lib/weblog/types'
import MDXRenderer from '@/components/MDXRenderer'

interface PaginationProps {
  totalPages: number
  page: number
}
interface ListLayoutProps {
  posts: WeblogPosts['data']
  title: string
  tags: TagsWithPostCount[]
  pagination?: WeblogPosts['pagination']
}

function Pagination({ totalPages, page }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = page - 1 > 0
  const nextPage = page + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={page - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${page - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {page} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${page + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({ posts, title, tags, pagination }: ListLayoutProps) {
  const pathname = usePathname()
  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {tags.map(({ id, name, color, postCount }) => {
                  const link = `/tags/${id}`
                  return (
                    <li key={id} className="my-3">
                      <Link
                        href={link}
                        className={`px-3 py-2 text-sm font-medium uppercase ${link === pathname ? 'text-primary-500' : 'text-gray-500'} hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500`}
                        aria-label={`View posts tagged ${id}`}
                      >
                        {`${name} (${postCount})`}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {posts?.map(({ id, title, tags, content, updatedAt }) => {
                return (
                  <li key={id} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <dl>
                        <dt className="sr-only">Published on</dt>
                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                          <time dateTime={updatedAt} suppressHydrationWarning>
                            {formatDate(updatedAt, siteMetadata.locale)}
                          </time>
                        </dd>
                      </dl>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/blog/${id}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap py-2.5">
                            {tags?.map((tag) => (
                              <Tag tagId={tag.id} key={tag.id} text={tag.name} color={tag.color} />
                            ))}
                          </div>
                        </div>
                        <div className="prose line-clamp-3 max-w-none text-gray-500 dark:text-gray-400">
                          <MDXRenderer content={content} />
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination page={pagination.page} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
