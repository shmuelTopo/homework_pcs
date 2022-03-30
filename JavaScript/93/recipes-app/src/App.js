// import logo from './logo.svg';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <>
      <header className="mb-3">
        <Navbar />
      </header >
      <Outlet />
    </>
    
  );
}

export default App;
