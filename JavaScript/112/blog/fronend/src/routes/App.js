import Navbar from '../components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Posts from './Posts';
import Add from './Add';
import Login from './Login';

function App() {
  return (
    <div className="relative p-2 md:w-3/4 xl:w-2/3 m-auto flex flex-col items-center">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route index element={<Posts />} />
          <Route path="/add" element={<Add />} />

          <Route path="/login" element={<Login theMethod="login" />} />
          <Route path="/signup" element={<Login theMethod="signup" />} />
          <Route path="*" element={<h1 className="m-5 text-danger text-3xl">404 Page Not Found!</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
