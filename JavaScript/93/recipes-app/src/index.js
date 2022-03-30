import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchResults from './routes/SearchResults.jsx';

import './index.css';
import App from './App';
import RecipeDetails from "./routes/RecipeDetails.jsx";

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/recipe/:recipeId" element={<RecipeDetails />} />
        <Route path="/search/:search" element={<SearchResults />} />
        <Route path="*" element={<h1 className="m-5 text-danger text-3xl">404 Page Not Found!</h1>} />
      </Route>
    </Routes>
    
  </BrowserRouter>,
  document.getElementById('root')
);