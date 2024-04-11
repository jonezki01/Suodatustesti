import React , { useState, useEffect } from 'react';
import './Movie.css';
import axios from 'axios';


export default function SearchForm() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [lastFilter, setLastFilter] = useState('');
  const allMovies = [];
  
  //Käsittelee seuraavan sivun painiketta
  const handlePages = async () => {

      if (page === 5) {
          setPage(5);
      } else {
        setPage(page + 1);
        console.log(page);
      }

  }

  //Käsittelee edellisen sivun painiketta
  const handlePreviousPage = async () => {

    if (page === 1) {
      return;
    } else {
      setPage(page - 1);
      console.log(page);
    }
  
  }
  //Tarkkailee muuttujan page muutoksia ja kutsuu handleSubmit funktiota aina kun page muuttuu
  //setPage() on asynkroninen funktio, joten käytämme useEffectiä, jotta voimme tarkkailla muutoksia
  useEffect(() => {
    console.log(page);

    if (lastFilter === '') {
      return;
    } else {
      handleSubmit(lastFilter);
    }

  }, [page]);

  //Kutsuu TMDB APIa ja hakee dataa
  const handleSubmit = async (filter) => {
    setLastFilter(filter); 
    
    try {

      const response = await axios.get('http://localhost:3000/search', { params: { filter, page } })
  
      console.log(response.data.results);

      allMovies.push(...response.data.results)
      setMovies(allMovies);
      console.log(allMovies);
      console.log(page);

    } catch (error) {
      console.error('Error fetching data', error);
    }
  };


  return (
    <div>
      <button onClick={() => handleSubmit('movie/top_rated')}>Top Rated</button>
      <button onClick={() => handleSubmit('tv/top_rated')}>Popular</button>
      <button onClick={() => handlePages()}>Next Page</button>
      <button onClick={() => handlePreviousPage()}>Previous Page</button>

      <div className='movie-list-top100'>
            {movies.map((movie) => (
                <div key={movie.id}>
                    <div className='movie-top100'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
                        <div className='layer'>
                            <h1>{movie.title}</h1>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
}