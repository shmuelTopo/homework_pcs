import Post from '../components/Post'
import { NavLink } from 'react-router-dom';
import { usePosts, usePostPagination } from '../PostsContext';

export default function Posts() {
  const posts = usePosts();
  const postPagination = usePostPagination();
  return (
      <>
        <NavLink to={'/add'}>
          <span className="btn text-lg mb-4 w-40">Add a Post</span>
        </NavLink>
        <div className='flex flex-col gap-2 w-full'>
          {posts && posts.map(post => {
            return (
              <Post key={post._id} post={post}/>
            )
          })}
        </div>
        <div className="flex justify-between w-full py-4">
          <button disabled={!postPagination.prevPage} className="btn text-lg mb-4 w-40" onClick={postPagination.prevPage}>Prev</button>
          <button disabled={!postPagination.nextPage} className="btn text-lg mb-4 w-40" onClick={postPagination.nextPage}>Next</button>
        </div>
      </>
    )
}
