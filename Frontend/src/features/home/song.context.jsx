import { createContext } from "react";
import { useState } from "react";


export const SongContext = createContext();


export const SongContextProvider = ({children}) => {

  const [song, setSong] = useState({
  "url": "https://ik.imagekit.io/r5ak3jukn/cohort-2/moodify/songs/song_VccFKg0KR.mp3",
  "posterUrl": "https://dummyimage.com/300x300/000/fff&text=No+Image",
  "title": "Unknown",
  "mood": "sad",

  });

  const [loading, setLoading] = useState(false);


  return (
   <SongContext.Provider 
   value={{loading, setLoading, song, setSong}}>
    {children}
    </SongContext.Provider>
  )
} 