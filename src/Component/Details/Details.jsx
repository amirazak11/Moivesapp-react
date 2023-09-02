import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Home from '../Home/Home';
export default function Details() {
  let [Details,setDetails]=useState(null)
    let {id ,type} = useParams()
    async function getDetails(){
    let {data} = await axios.get(` https://api.themoviedb.org/3/${type}/${id}?api_key=c636ed7787cc302d96bf88ccf334e0d8`)
    setDetails(data)
    console.log({data})
    }
    useEffect(()=>{
      getDetails()
    },[])

  return (
<>
<div className="container">
  <div className="row py-3">
    <div className="col-md-3 ">
    <img className="w-100 h-100 rounded-1"
                src={`https://image.tmdb.org/t/p/original${Details?.poster_path}`}
                alt=""
              />
    </div>
    <div className="col-md-9">
<div className="item">
 <h1>{Details?.title}</h1>
 <p>{Details?.tagline}</p>
 <ul className='list-unstyled d-flex'>{Details?.genres?.map(genre => <div className='bg-info p-3 mx-2 rounded-2'>{genre?.name}</div>)}</ul>
 <p>vote count:{Details?.vote_count}</p>
 <p>popularity:{Details?.popularity}</p>
 <p>release date:{Details?.release_date}</p>
 <p>{Details?.overview}</p>

</div>
    </div>
  </div>
</div>


</>  )
}
