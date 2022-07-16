import Navbar from '../components/Navbar';
import { AppProvidor } from '../AppContext';
import useFetch from '../hooks/useFetch';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from '../routes/Posts';
import Add from '../routes/Add';
import Login from '../routes/Login';
import { SERVER_PORT } from '../constants';
import React, { useState, useEffect, useRef } from 'react';
import scoketIo from 'socket.io-client';

function App() {
  const { data, error } = useFetch(`http://localhost:${SERVER_PORT}/posts`);
  const [ connected, setConnected ] = useState(false);
  const [ posts, setPosts ] = useState([]);
  const oldPosts = useRef([]);

  useEffect(() => {
    if(error){
      return;
    }
    oldPosts.current = data;

    setPosts(data);
  }, [data, error]);

  useEffect(() => {
    
    if(connected) {
      return;
    }

    const theSocket = scoketIo(`http://localhost:${SERVER_PORT}`, {
      withCredentials: true,
    });

    theSocket.on('post', post => {
      oldPosts.current.push(post);
      setPosts(oldPosts.current);
    });

    theSocket.on('comment', c => {
      const post = data.find(p => {
        return p._id === c.postId;
      })
      if(!post) {
        //window.location.reload();
        return;
      }
      post.comments = post.comments || [];
      post.comments.push(c);
      
    })
    setConnected(true);
  }, [connected, data])
  return (
    <AppProvidor>
      <div className='relative p-2 md:w-3/4 xl:w-2/3 m-auto flex flex-col items-center'> 
        <BrowserRouter>
          <Navbar></Navbar>
          <Routes>
            <Route index element={<Posts posts={posts} />}/>
            <Route path='/add' element={<Add />}/>
            <Route 
              path='/login'  
              element={<Login theMethod="login" />}
            />
            <Route path='/signup' element={<Login theMethod="signup" />}/>
            <Route path="*" element={<h1 className="m-5 text-danger text-3xl">404 Page Not Found!</h1>} />
          </Routes>
        </BrowserRouter> 
      </div>
    </AppProvidor>
  );
}

export default App;