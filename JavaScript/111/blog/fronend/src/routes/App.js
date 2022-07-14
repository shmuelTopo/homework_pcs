import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import { UserProvider } from '../UserContext';

function App() {

  return (
    <UserProvider>
      <div className='relative p-2 md:w-3/4 xl:w-2/3 m-auto flex flex-col items-center'> 
        <Navbar/>
        <Outlet />
      </div>
    </UserProvider>
  );
}

export default App;