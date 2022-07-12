import React from 'react'
import Post from './Post'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Posts() {
  const [ posts, setPosts ] = useState([]);
  const [ done, setDone ] = useState(false);
  useEffect(() => {
    if(done) {
      return;
    }
    (async function() {
      const response = await fetch("http://localhost:3000/posts", {
        method: "GET",
        credentials: "include",
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json();
      setPosts(data);
      setDone(true);
    })();
  }, [posts])

  console.log('hi', posts);
  return (
      <>
      <a href='/add' id="showUsers" className="btn text-lg mb-4 w-40">Add a Post</a>
      <div className='flex flex-col gap-2'>
        {posts.map(post => {
          console.log('hi');
          console.log(post);
          return (
            <Post key={post._id} post={post}/>
          )
        })}
      </div>
      </>
    )
}
