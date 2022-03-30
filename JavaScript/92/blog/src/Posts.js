import React from 'react'
import Post from './Post'

export default function Posts({ posts, user }) {
  console.log(user);
  return (
      <>
        {posts.map(post => {
          return (
            <Post key={post.id} post={post} user={user}/>
          )
        })}
      </>
    )
}
