import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from './Posts';
import Add from './Add';

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Posts />}/>
        <Route path='/add' element={<Add />}/>
        <Route path="*" element={<h1 className="m-5 text-danger text-3xl">404 Page Not Found!</h1>} />
      </Route>
    </Routes>
    
  </BrowserRouter>,
  document.getElementById('root')
);

