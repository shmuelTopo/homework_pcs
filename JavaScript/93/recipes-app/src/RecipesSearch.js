import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RecipesSearch() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();


  
  const handelSearch = (e) => {
    e.preventDefault();
    console.log(`Searching for ${query.trim()}`);
    navigate(`/search/${query.trim()}`)
  }



  return (
    <form onSubmit={handelSearch} className="form-control">
        <input onChange={e => setQuery(e.target.value)} type="text" value={query} placeholder="Search" className="input input-bordered" />
    </form>
  )
}

