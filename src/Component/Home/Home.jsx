import React, { useState, useEffect } from 'react'
import axios from "axios";
import Iteam from '../iteam/Iteam';
import { Offline } from "react-detect-offline";
import DetectOffline from '../Offline/Offline';
import Loader from '../Loader/Loader';

export default function Home({dataDetail}) {
  let [movies, setmovies] = useState([]);
  let [tv, settv] = useState([]);
  let [isLoader,setisLoader]=useState(true);
  async function getTreanding(type,dest) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=c636ed7787cc302d96bf88ccf334e0d8`
    );
    console.log(data)

    dest(data.results)
    setisLoader(false)
  }
  useEffect(() => {
    getTreanding("movie",setmovies);
    getTreanding("tv",settv);

  }, []);
  return (
    <>
      <div className="container">
<Offline>
  <DetectOffline/>
</Offline>
        {isLoader && <Loader/>}
        {!isLoader && <>        <div className="row mt-2">
          <div className="col-md-3">

            <div className="content  d-flex justify-content-center h-100 flex-column">

              <h2 className="position-relative">Trending
                <br />Movies<br />
                To watch now
              </h2>

              <p className="text-muted">most watched movies by day</p>

            </div></div>
            {movies?.slice(1, 13).map(movie => <Iteam key={movie.id} dataRes={movie} />)}




        </div>
        <div className="row">
          <div className="col-md-3">

            <div className="content  d-flex justify-content-center h-100 flex-column">

              <h2 className="position-relative">Trending
                <br />Tv<br />
                To watch now
              </h2>

              <p className="text-muted">most watched movies by day</p>

            </div></div>
          {tv?.slice(1, 13).map(movie => <Iteam key={movie.id} dataRes={movie} />)}


        </div></>}


      </div>

    </>
  )
}
