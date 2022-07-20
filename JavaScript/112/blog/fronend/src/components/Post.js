import React, { useState } from 'react';
import Comments from './Comments';
import { dateFormater } from '../constants';

export default function Post({ post }) {
  const [ showComments, setShowCommetns ] = useState(false);
  const toggleComments = () => {
    setShowCommetns(!showComments);
  }

  return (
    <figure id={post.id} className="comment flex flex-col justify-between bg-info/20 rounded-xl p-8 text-left space-y-4 w-full">
      <blockquote>
        <p className='text-slate-400 text-sm'>by {post?.author} on {dateFormater(post.datetime)}</p>
        <p className="text-xl font-bold">{post.title}</p>
        <p className="text-lg font-medium">
          {post.body}
        </p>
      </blockquote>
        
        <div>
          {showComments && <Comments comments={post.comments} postId={post._id} />}
          <button onClick={toggleComments} id="commentBtn" type="button" className="btn btn-primary">{showComments ? 'Hide Comments' : 'Show Comments'}</button>
        </div>
    </figure>  
  )
}
