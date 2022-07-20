import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './routes/App';
import { CookiesProvider } from "react-cookie";
import { PostsProvidor } from './PostsContext';
import { UserProvidor } from './UserContext';

render(
  <UserProvidor>
    <PostsProvidor>
      <CookiesProvider>
        <App></App>
      </CookiesProvider>
    </PostsProvidor>
  </UserProvidor>
  ,document.getElementById('root')
);

