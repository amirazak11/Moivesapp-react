import React, { useState, useEffect } from 'react'
import axios from "axios";
import Iteam from '../iteam/Iteam';
import Login from '../Login/Login';
export default function Moives() {
  let [movies, setmovies] = useState(null);
  async function getTreanding() {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`
    );
    console.log(data)

    setmovies(data.results)
  }
  useEffect(() => {
    getTreanding();

  }, []);
  return (
    <>
    <div>
            <div className="container">
        <div className="row">
          {movies?.map(movie => <Iteam key={movie.id} dataRes={movie} /> )}
        </div></div>
      
    </div>
    </>
  )
}
