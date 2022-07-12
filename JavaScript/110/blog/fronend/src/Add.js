import React, { useState } from 'react';
import './Add.css';
import { useNavigate } from "react-router-dom";

export default function Posts() {
  let navigate = useNavigate();
  const [header, setHeader] = useState('');
  const [text, setText] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('You clicked submit.');
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
        header: header,
        text: text,
        userid: '62cafa2f6aedca0b135f3b43'
      })
    })


    const theText = await response.text();
    console.log(theText);
  }

  return (
      <>
        <form onSubmit={handleSubmit} className="newBlog">
          <div className="form-control">
            <label className="input-group input-group-lg">
              <span>Header</span>
              <input onChange={e => setHeader(e.target.value)} value={header} required minlenth="5" type="text" placeholder="enter you header here..." className="input input-bordered input-lg" />
            </label>
          </div>
          <textarea value={text} onChange={e => setText(e.target.value)} required minlenth="10" className="textarea" placeholder="enter the text here..."></textarea>
          <input className="btn btn-accent" type="submit"></input>
        </form>
      </>
    )
}
