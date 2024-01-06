import { FileRoute, Link } from '@tanstack/react-router'
import { PostErrorComponent } from './posts.$postId'
import { fetchPost } from '../posts'

export const Route = new FileRoute('/posts_/$postId/deep').createRoute({
  loader: async ({ params: { postId } }) => fetchPost(postId),
  errorComponent: PostErrorComponent as any,
  component: PostDeepComponent,
})

function PostDeepComponent() {
  const post = Route.useLoaderData()
  return (
    <div className="p-2 space-y-2">
      <Link
        to="/posts"
        className="block py-1 text-blue-800 hover:text-blue-600"
      >
        ← All Posts
      </Link>
      <h4 className="text-xl font-bold underline">{post.title}</h4>
      <div className="text-sm">{post.body}</div>
    </div>
  )
}
