import React, { useState, useEffect } from 'react'
import useFetch from './useFetch';
import Comments from './Comments';


export default function Post({ post, user }) {
    const [comments, setComments] = useState(null);
    const [ shouldShowComments, setShouldShowComments ] = useState(false);

    const postsData = useFetch(null);

    const showComments = () => {
        
        if(comments) {
            setShouldShowComments(true);
        } else {
            postsData.setUrl(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
        }
    }

    const hideComments = () => {
        console.log('hideComments');
        setShouldShowComments(false);
    }

    useEffect(() => {
        if (postsData.data && !comments && !postsData.loading && !postsData.error) {
            setComments(postsData.data);
            console.log(postsData.data);
            setShouldShowComments(true);
        }
    }, [comments, postsData.data, postsData.error, postsData.loading]);


    return (
        <figure id={post.id} className="comment flex flex-col justify-between bg-info/20 rounded-xl p-8 text-left space-y-4">
            <blockquote>
                <p className="text-xl font-bold">{post.title}</p>
                <p className="text-lg font-medium">
                    "{post.body}"
                </p>
            </blockquote>
            <figcaption className="font-medium">
                <div>
                    {user.name}
                </div>
                <div className="text-sky-500/50">
                    {user.email}
                </div>

            </figcaption>
            <div>
                {shouldShowComments && <Comments comments={comments} />}
                <button onClick={() => shouldShowComments ? hideComments() : showComments()} id="commentBtn" type="button" className="btn btn-primary">{shouldShowComments ? 'Hide Comments' : 'Show Comments'}</button>
            </div>
        </figure>  
    )
}
