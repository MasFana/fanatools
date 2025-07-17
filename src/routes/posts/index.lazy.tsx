import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Link, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts/')({
  component: RouteComponent,
})

function RouteComponent() {
  const posts = Array.from({ length: 50 }).map(
    (_, index) => `Post${index + 1}`
  )
  return (
    <>
      <ScrollArea className='h-82 w-72 p-2'>
        {posts.map((post, index) => {
          return (
            <div key={index} className='w-full mb-4 hover:font-bold text-center transition-all'>
              <DropdownMenuSeparator />
              <Link to='/posts/$postId' params={{ postId: post }}>{post}</Link>
            </div>
          )
        })}

      </ScrollArea >
    </>
  )
}
