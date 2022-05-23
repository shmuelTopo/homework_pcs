import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './Users';
import Posts from './Posts';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Users />}/>
        <Route path="/posts/:userId" element={<Posts />} />
        <Route path="*" element={<h1 className="m-5 text-danger text-3xl">404 Page Not Found!</h1>} />
      </Route>
    </Routes>
    
  </BrowserRouter>,
  document.getElementById('root')
);

