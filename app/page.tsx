import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { getCommits } from 'lib/weblog'

export default async function Page() {
  const commits = await getCommits()
  return <Main posts={commits} />
}
