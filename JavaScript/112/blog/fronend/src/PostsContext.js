import React, { useContext, useEffect, useRef, useState } from "react";
import { SERVER_PORT } from './constants';
import useFetch from'./hooks/useFetch';
import scoketIo from 'socket.io-client';

const PostsContext = React.createContext();
const PostPaginationContext = React.createContext();

export function usePosts() {
  return useContext(PostsContext);
}

export function usePostPagination() {
  return useContext(PostPaginationContext);
}

export function PostsProvidor( { children }) {
  const initialUrl = `http://localhost:${SERVER_PORT}/posts?postsperpage=5`;
  const { data, error, setUrl, setRefresh } = useFetch(initialUrl);
  const [ posts, setPosts ] = useState([]);
  const oldPosts = useRef([]);
  
  const [ pagination, setPagination ] = useState({
    nextPage: undefined,
    prevPage: undefined,
    resetPages: undefined
  });

  useEffect(() => {
    if(error || !data){
      return;
    }

    data?.post?.reverse();
    oldPosts.current = data.posts;
    setPosts(data.posts);

    const paginationOptions = {};

    if(data.nextUrl) {
      paginationOptions.nextPage = () => {
        setUrl(data.nextUrl);
        setRefresh(true);
      }
    } else {
      paginationOptions.nextPage = undefined;
    }

    if(data.prevUrl) {
      paginationOptions.prevPage = () => {
        setUrl(data.prevUrl);
        setRefresh(true);
      };
    } else {
      paginationOptions.prevPage = undefined;
      if(data.posts.length < 5) {
        setUrl(initialUrl);
      }
    }

    paginationOptions.resetPages = function() {
      setUrl(initialUrl);
      setRefresh(true);
    };

    setPagination(paginationOptions);

  }, [data, error, setUrl]);

  useEffect(() => {
    const socket = scoketIo(`http://localhost:${SERVER_PORT}`, {
      withCredentials: true,
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
  }, []);
  
  return (
    <PostPaginationContext.Provider value={pagination}>
      <PostsContext.Provider value={posts}>
        { children }
      </PostsContext.Provider>
    </PostPaginationContext.Provider>
  )
}
