import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './routes/App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Posts from './routes/Posts';
import Add from './routes/Add';
import Login from './routes/Login';
import { CookiesProvider } from "react-cookie";


render(
  <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Posts />}/>
          <Route path='/add' element={<Add />}/>
          <Route path='/login' element={<Login theMethod="login" />}/>
          <Route path='/signup' element={<Login theMethod="signup" />}/>
          <Route path="*" element={<h1 className="m-5 text-danger text-3xl">404 Page Not Found!</h1>} />
        </Route>
      </Routes>
      
    </BrowserRouter>
  </CookiesProvider>,
  document.getElementById('root')
);

