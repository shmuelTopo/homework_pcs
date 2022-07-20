import React from 'react';
import { dateFormater } from '../constants';

export default function Comment({ comment }) {
  return (
    <div className="comment flex flex-col justify-between rounded-xl mb-3 text-left space-y-4">
      <figcaption className="font-medium">
        <div className="text-sky-500 dark:text-sky-400">
          {comment.body}
        </div>
        <div className="text-slate-500 text-xs dark:text-slate-500">
          by {comment.author} on {dateFormater(comment.datetime)}
        </div>  
      </figcaption>
      <div className="w-full my-3 bg-info h-px"></div>
    </div>
  )
}
