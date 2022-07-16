import React, { useContext, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { SERVER_PORT } from './constants';

const UserContext = React.createContext();
const SetUserContext = React.createContext();
const PostsContext = React.createContext();
const UpdatePostsContext = React.createContext();

export function useUser() {
  return useContext(UserContext);
}

export function useUpdateUser() {
  return useContext(SetUserContext);
}

export function usePosts() {
  return useContext(PostsContext);
}

export function useUpdatePosts() {
  return useContext(UpdatePostsContext);
}

export function getPosts() {
  return allThePosts;
}

let allThePosts;

export function AppProvidor( { children }) {

  const [ cookies, setCookies ] = useCookies();
  const [ user, setUser ] = useState(cookies.user);
  const [ posts, setPosts ] = useState([]);
  const [ fetched, setFetched ] = useState(false);
  
  useEffect(() => {
    if(fetched) {
      return;
    }
    (async function() {
      const response = await fetch(`http://localhost:${SERVER_PORT}/posts`, {
        method: "GET",
        credentials: "include",
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      })
      setFetched(true);
      const data = await response.json();
      setPosts(data);
    })();
  }, [fetched, posts]);

  function updateUser(user) {
    setUser(user);
    setCookies('user', user);
  }

  function setThePosts(thePosts) {
    setPosts(thePosts)
    allThePosts = thePosts;
  }
  
  return (
    <UpdatePostsContext.Provider value={setThePosts}>
      <PostsContext.Provider value={posts}>
        <UserContext.Provider value={user}>
          <SetUserContext.Provider value={updateUser}>
            { children }
          </SetUserContext.Provider>
        </UserContext.Provider>
      </PostsContext.Provider>
    </UpdatePostsContext.Provider>
  )
}



