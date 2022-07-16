import React, { useState } from 'react'
import Comment from './Comment';
import { MdSend } from 'react-icons/md';
import { useUser } from '../AppContext';
import { SERVER_PORT } from '../constants';

export default function Comments({ comments, postId }) {
  const user = useUser();
  const [ commentBody, setCommentBody ] = useState('');

  async function addComment(e) {
    e.preventDefault();
    setCommentBody('');
    await fetch(`http://localhost:${SERVER_PORT}/posts/${postId}`, {
      method: "POST",
      credentials: "include",
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: commentBody
      })
    })
  }
  return (
      <div className='px-8 mb-3'>
        {comments?.map((comment, i) => <Comment key={i} comment={comment} />)}
        {user?.authenticated && (
        <form onSubmit={addComment}>
          <div className="form-control flex flex-row items-center gap-3">
            <div className='w-full'>
              <input 
                value={commentBody} 
                onChange={e => setCommentBody(e.target.value)}
                type="text" 
                placeholder="Post a new comment" 
                className="input input-bordered" 
              />
            </div>
            <div className='flex'>
              <button className=''>
                <MdSend size={45}></MdSend>
              </button>            
            </div>
          </div>
        </form>)}
        {!user?.authenticated && (
          <p>You must be logged in to comment</p>
        )}

      </div>  
  )
}
