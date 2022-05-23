import Header from './Header.js';
import StockInput from './StockInput.js';
import { Divider } from '@mantine/core';
import { Outlet } from 'react-router-dom';

function App() {

	return (
		<>
			<Header />
			<StockInput />
			<Divider my="sm" />
			<Outlet />
		</>
	)
}

export default App;
