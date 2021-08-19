import { useEffect, useState, memo } from 'react';
import { Grid, GridCellRenderer } from "react-virtualized";

import { Header } from './Header';
import { MovieCard } from './MovieCard';
import { api } from '../services/api';

import '../styles/content.scss';
import { useCallback } from 'react';

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
};

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
};

interface ContentProps {
  selectedGenreId: number;
};

export function ContentComponent({selectedGenreId}:ContentProps) {

  const [movies, setMovies] = useState<Array<MovieProps[]>>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      generateData(response.data)
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
    
  }, [selectedGenreId]);

  

  const generateData = useCallback((movies) => {
    const rows: Array<MovieProps[]> = [];
    var moviesIndex = 0

    for (let i = 0; i < Math.ceil(movies.length/3) ; i++) {
      rows[i] = [];

      for ( let j=0 ; j < 3 ; j++) {

        if(movies[moviesIndex] !== undefined){
          rows[i].push(movies[moviesIndex]);
          moviesIndex++
        } 
      }
    }
    return setMovies(rows);
  },[])

  const cellRenderer: GridCellRenderer = ({columnIndex, key, rowIndex, style}) => {

    if(movies[rowIndex][columnIndex] !== undefined) {
    return (
      <div 
      key={key} 
      style={{
        ...style,
        display:'flex',
        alignItems:'start',
        justifyContent:'start'

      }}>
        <MovieCard 
        key ={movies[rowIndex][columnIndex]?.imdbID} 
        title={movies[rowIndex][columnIndex]?.Title} 
        poster={movies[rowIndex][columnIndex]?.Poster} 
        runtime={movies[rowIndex][columnIndex]?.Runtime} 
        rating={movies[rowIndex][columnIndex]?.Ratings[0].Value} 
        />
      </div>
    );
    }
  }

  return (
    <div className="container">
      <Header selectedGenre={selectedGenre}/>
      <main>
        <Grid
          cellRenderer={cellRenderer}
          columnCount={3}
          rowCount={movies.length}
          
          height={770}
          width={840}
          rowHeight={420}
          columnWidth={303}
          style={{
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        />
      </main>
    </div>
  )
};

export const Content = memo(ContentComponent, (prevProps, nextProps)=>{
  return Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId)
})