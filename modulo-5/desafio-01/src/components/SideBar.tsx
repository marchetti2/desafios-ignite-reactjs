import { useEffect, useState, useCallback, memo } from 'react';
import { List, ListRowRenderer} from 'react-virtualized'

import { Button } from './Button';
import { api } from '../services/api';

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
};

interface SideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id:number)=>void;
};

function SideBarComponent({selectedGenreId, setSelectedGenreId}:SideBarProps) {

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  },[])

  const rowRenderer:ListRowRenderer = /* useCallback( */({index,key,style})=>{
    return (
      <div className="buttons-container" key={String(key)} style={style}>
      <Button
        title={genres[index].title}
        iconName={genres[index].name}
        onClick={()=>handleClickButton(genres[index].id)}
        selected={selectedGenreId === genres[index].id}
      />
      </div>
    )
  }/* ,[]) */

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>
      <List 
        height={470}
        rowHeight={78}
        width={318}
        rowCount={genres.length}
        rowRenderer={rowRenderer}
        />
    </nav>
  )
};

export const SideBar = memo(SideBarComponent,(prevProps, nextProps)=>{
  return Object.is(prevProps.selectedGenreId, nextProps.selectedGenreId)
})