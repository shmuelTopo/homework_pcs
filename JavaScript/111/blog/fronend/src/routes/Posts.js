import Post from '../components/Post'
import { NavLink } from 'react-router-dom';


export default function Posts({posts}) {
  
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
      </>
    )
}
