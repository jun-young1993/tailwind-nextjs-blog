import Main from './Main'
import {getPosts} from "../lib/weblog";


export default async function Page() {
  const posts = await getPosts({
    limit: 5
  })
  console.log('posts',posts);
  return <Main posts={posts.data} />
}
