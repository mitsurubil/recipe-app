import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {

  const APP_KEY = 'dd27137d7bcf5a4b2c3e1449d5973f1a';
  const APP_ID = 'df43e539';
  // const APP_KEY = '8c6696ce134ec8865902442547c65cc4';
  // const exampleGet = `https://www.food2fork.com/api/get?key=${APP_KEY}&rId=35382`;
  // const [counter, setCounter] = useState(0);
  //https:www.food2fork.com/api/search?key=${APP_KEY}q=chicken%20breast&page=1

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');


  useEffect(() => {
    (async function getRecipes() {
      const response = await fetch(
        `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      // const recipe = [data.recipe.ingredients, data.recipe.title, data.recipe.source_url]
      setRecipes(data.hits);
      // console.log(data.hits);
    })()
  }, [query]);

  const updateSearch = e => {
    setSearch(e.target.value);
    // console.log(search);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch(''); //will return search to empty
  };

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch} />
        <button
          className='search-button'
          type='submit'>
          Search
        </button>
      </form>
      <div className='recipes' >
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}
export default App;
