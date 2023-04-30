import {useEffect, useState} from "react";
import './App.css';
import searchIcon from './search.svg';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com?apikey=4e17bca5';

const App = ()=>{

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title)=>{
        const res = await fetch(`${API_URL}&s=${title}`);
        const data = await res.json();
        setMovies(data.Search);
    }

    
    useEffect(()=>{
        searchMovies('avengers');
    }, []);
    return(
        <div className="app">
            <h1>MovieMate</h1>
            <div className="search">
                <input 
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={(e)=>setSearchTerm(e.target.value)}
                />
                <img 
                    src={searchIcon} 
                    alt="searchIcon" 
                    onClick={()=>searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                )
                : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    )
}

export default App;