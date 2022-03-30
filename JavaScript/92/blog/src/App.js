import Users from './Users';
import React, { useState, useEffect } from 'react'
import useFetch from './useFetch';
import Posts from './Posts';
import SwapThemes from './SwapThemes';

function App() {
  const [users, setUsers] = useState(null);
  const [posts, setPosts] = useState(null);
  const [pageToDisplay, setPageToDisplay] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [subtitle, setSubtitle] = useState('Users');

  const usersData = useFetch('https://jsonplaceholder.typicode.com/users');
  const postsData = useFetch(null);

  const userClicked = (userId) => {
    setSelectedUser(users[userId -1]);
    postsData.setUrl(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  }

  useEffect(() => {
      if (!users && usersData.data) {
          setUsers(usersData.data);
          setPageToDisplay('users');
      }
  }, [users, usersData]);

  useEffect(() => {
    if (selectedUser && pageToDisplay !== 'posts' && !postsData.loading && !postsData.error && postsData.data) {
        setPosts(postsData.data);
        setPageToDisplay('posts');
    }
  }, [postsData.loading, postsData.data, postsData.error, posts, pageToDisplay, selectedUser]);

  useEffect(() => {
    if (selectedUser) {
      setSubtitle(selectedUser.name);
    }
  }, [selectedUser]);

  return (
    <div className='relative'> 
      <SwapThemes />
      <div className="p-4 sm:px-2 flex flex-col items-center flex-1 gap-6">
          <h1 className="text-5xl">Shmuel Toporowitch Blog</h1>
          <h2 className="text-3xl">{subtitle}</h2>
          <button id="showUsers" onClick={() => {
            if(pageToDisplay === 'posts') {
              setPageToDisplay('users');
              setSelectedUser(null);
              setSubtitle('Users');
            }
          }} className="btn text-lg">Show Users</button>

          <div className="w-4/5 m-2 bg-accent h-1 round-lg"></div>

          {pageToDisplay === 'users' && <Users userClicked={userClicked} users={users} />}
          {pageToDisplay === 'posts' && <Posts posts={posts} user={selectedUser}/>}
      </div>
    </div>
   
  );
}

export default App;

