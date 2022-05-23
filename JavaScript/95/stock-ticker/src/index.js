import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import StockDetails from './StockDetails';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="/stock/:ticker" element={<StockDetails />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

