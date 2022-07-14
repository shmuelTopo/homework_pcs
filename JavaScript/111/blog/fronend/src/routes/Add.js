import React, { useState } from 'react';
import './Add.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useUser } from '../UserContext';

export default function Posts() {
  const navigate = useNavigate();
  const [ title, setTitle ] = useState('');
  const [ body, setBody ] = useState('');
  const user = useUser();
  console.log('user', user);
  useEffect(() => {
    if(!user || !user.authenticated) {
      console.log('You are not logged in');
      navigate("/login", { replace: true });
    }
  });


  async function handleSubmit(e) {
    e.preventDefault();
    navigate("/", { replace: true });  

    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      credentials: "include",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: title,
        body: body,
        userid: '62cafa2f6aedca0b135f3b43'
      })
    })
  }

  return (
      <>
        <form onSubmit={handleSubmit} className="newBlog">
          <div className="form-control">
            <label className="input-group input-group-lg">
              <span>Title</span>
              <input onChange={e => setTitle(e.target.value)} value={title} required minlenth="5" type="text" placeholder="enter you title here..." className="input input-bordered input-lg" />
            </label>
          </div>
          <textarea value={body} onChange={e => setBody(e.target.value)} required minlenth="10" className="textarea" placeholder="enter the body here..."></textarea>
          <input className="btn btn-accent" type="submit"></input>
        </form>
      </>
    )
}
