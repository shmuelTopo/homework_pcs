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
    <App></App>
  </CookiesProvider>,
  document.getElementById('root')
);

