import React from 'react'

export default function Comment({ comment }) {
  return (
        <div className="comment flex flex-col justify-between rounded-xl mb-3 px-8 text-left space-y-4">
            <figcaption class="font-medium">
                <p className="text-lg font-bold">{comment.name}</p>
                <div className="text-slate-700 dark:text-slate-500">
                    {comment.body}
                </div>  
                <div className="text-sky-500 dark:text-sky-400">
                    {comment.email}
                </div>
            </figcaption>
            <div className="w-full my-3 bg-info h-px"></div>
        </div>
  )
}
