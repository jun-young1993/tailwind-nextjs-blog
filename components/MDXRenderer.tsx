// 📌 src/components/MDXRenderer.tsx
import { MDXRemote } from 'next-mdx-remote/rsc'

interface MDXRendererProps {
  content: string
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  return <MDXRemote source={content} />
}
