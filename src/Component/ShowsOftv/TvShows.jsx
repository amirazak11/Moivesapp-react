import React, { useState, useEffect } from 'react'
import axios from "axios";
import Iteam from '../iteam/Iteam';
import { array } from 'joi';
export default function Tvshows() {
  let [tv, settv] = useState(null);
  let [isLoader,setisLoader]=useState(true);
  let pageList = new Array(10).fill("a").map((ele,i)=>i+1)
  async function getTreanding(pagenum) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/tv/day?api_key=c636ed7787cc302d96bf88ccf334e0d8&page=${pagenum}`
    );
    console.log(data)
    settv(data.results)
    setisLoader(false)
  }
  useEffect(() => {
    getTreanding(1);

  }, []);
  function onpageNum(page){
    getTreanding(page);

  }
  return (
    <>

        <div className="container">
  <div className="row">
    <nav aria-label="Page navigation example " className='d-flex justify-content-center py-3'>
  <ul className="pagination">
    <li className="page-item">
      <a className="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    {pageList.map((ele)=>(
  <li className="page-item" key={ele} onClick={()=>onpageNum(ele)}>
<a className="page-link" to="">
    {ele}</a></li>
    ))}
  

    <li className="page-item">
      <a className="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
          {tv?.map(movie => <Iteam key={movie.id} dataRes={movie} isLoader={isLoader} setisLoader={setisLoader}/> )}
        </div>

        </div>

    </>
  )
}
