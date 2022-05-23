import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className='relative p-2 md:w-3/4 xl:w-2/3 m-auto'> 
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;