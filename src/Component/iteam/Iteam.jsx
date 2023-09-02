import React from 'react'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'

export default function Iteam({dataRes,isLoader,setisLoader}) {


  return (
<>
{isLoader && <Loader/>}
        {!isLoader && <> 
    <div className="col-md-3 py-3 position-relative">
    <div className="vote bg-info p-2 position-absolute">
{dataRes.vote_average.toFixed(1)}
</div>
        <div className="item overflow-hidden position-relative rounded-2">
        <img className="w-100"
    src={`https://image.tmdb.org/t/p/original${dataRes.poster_path}`}
    alt=""
  />
<Link to={"/details/"+ dataRes.id + "/" + dataRes.media_type}>
<div className="overlay text-white ">
{dataRes.overview.split(" ").splice(0,25).join(" ")}</div>
</Link>

</div>

</div>
</>
  }
</>
  )
}
