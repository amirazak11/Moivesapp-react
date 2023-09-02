import React, { useState, useEffect } from 'react'
import axios from "axios";
import Carousel from 'react-bootstrap/Carousel';
export default function Show() {
    let [movies, setmovies] = useState(null);
    
    async function getTreanding() {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`
      );
      console.log(data)
  
      setmovies(data.results);

    }
    useEffect(() => {
      getTreanding();
  
    }, []);
  return (
    <>

{movies?.slice(0,4).map(moive =>   <div key={moive.id} className="col-md-3 py-3 position-relative">
                <div className="vote bg-info p-2 position-absolute">
{moive.vote_average.toFixed(1)}
</div>
                    <div className="item overflow-hidden position-relative rounded-2">
                    <img className="w-100"
                src={`https://image.tmdb.org/t/p/original${moive.poster_path}`}
                alt=""
              />
    <div className="overlay text-white ">
        {moive.overview.split(" ").splice(0,25).join(" ")}</div>

</div>

 </div>)}

    

        </>
          )
}
