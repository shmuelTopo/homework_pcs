import { useState } from 'react'
import { TextInput, Button, Center, Autocomplete } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function StockInput() {
	const [ value, setValue ] = useState('');
  const navigate = useNavigate();
	const navigateToStock = () => {
		if(value) {
			navigate(`/stock/${value.toUpperCase()}`);
		}
	}

	return (
		<div className='stock-input'>
			{/* <Center>
				<label htmlFor='stockInput'>Enter Stock Ticker Symbol</label>
			</Center>
				
			<TextInput value={value} onChange={e => setValue(e.target.value.toUpperCase())} id='stockInput' type='text' placeholder='stock symbol' /> */}

			
			<Autocomplete
				value={value}
				onChange={setValue}
				className='stock-input'
				label="Your favorite framework/library"
				placeholder="Pick one"
				data={['AAPL', 'IBM', 'Svelte', 'Vue']}
			/>
			<Button onClick={navigateToStock}>Update</Button>
		</div>
	)
}
