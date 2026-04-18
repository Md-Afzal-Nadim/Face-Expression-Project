import { getSong } from "../service/song.api";
import {  useContext } from "react";
import { SongContext } from "../song.context";


export const useSong = () => {
  const context = useContext(SongContext)

  const {loading , setLoading, song, setSong} = context

  async function handleGetSong({mood}) {
    setLoading(true)
    const data = await getSong({mood})
    setSong(data.songs[0])
    setLoading(false)
  }

  return (
    {loading, song,  handleGetSong}
  )
}