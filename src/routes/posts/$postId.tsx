import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
  loader: async ({ params }) => {
    return {
      postId: params.postId,
    }
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error loading post</div>,
})

function PostComponent() {
  const { postId } = Route.useLoaderData()
  return <div>Hello {postId}</div>
}