import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import {getPosts} from "../../lib/weblog";

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const posts = await getPosts({
    limit: 5,
    page: 1,
  })
  return (
      <ListLayout
          posts={posts.data}
          pagination={posts.pagination}
          title="All Posts"
      />
  )
}
