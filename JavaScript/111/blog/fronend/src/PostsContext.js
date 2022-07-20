import React, { useContext, useEffect, useRef, useState } from "react";
import { SERVER_PORT } from './constants';
import useFetch from'./hooks/useFetch';
import scoketIo from 'socket.io-client';

const PostsContext = React.createContext();

export function usePosts() {
  return useContext(PostsContext);
}

export function PostsProvidor( { children }) {
  const { data, error } = useFetch(`http://localhost:${SERVER_PORT}/posts`);
  const [ posts, setPosts ] = useState([]);
  const oldPosts = useRef([]);

  useEffect(() => {
    if(error || !data){
      return;
    }

    oldPosts.current = data;
    setPosts(data);

    const socket = scoketIo(`http://localhost:${SERVER_PORT}`, {
      withCredentials: true,
    });

    socket.on('post', post => {
      console.log('new post', post);
      oldPosts.current.push(post);
      setPosts([...oldPosts.current]);
    });

    socket.on('comment', comment => {
      console.log('new', comment);
      const post = oldPosts.current.find(p => {
        return p._id === comment.postId;
      })
      if(!post) {
        return;
      }
      post.comments = post.comments || [];
      post.comments.push(comment);
      setPosts([...oldPosts.current]);
    });
  }, [data, error]);
  
  return (
    <PostsContext.Provider value={posts}>
      { children }
    </PostsContext.Provider>
  )
}
