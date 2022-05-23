import React from 'react'
import Post from './Post'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function Posts() {
  const [ posts, setPosts ] = useState([]);
  const params = useParams();
  console.log('params', params);

  useEffect(() => {
    (async function() {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=' + params.userId);
        const data = await response.json();

        setPosts(data);
    })();
  }, [params.userId])

  return (
      <div className='flex flex-col gap-2'>
        {posts.map(post => {
          return (
            <Post key={post.id} post={post} user={'user'}/>
          )
        })}
      </div>
    )
}
