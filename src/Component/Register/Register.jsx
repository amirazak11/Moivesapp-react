import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import Show from '../Show/Show';
export default function Register() {
  let [validationError, setvalidationError] = useState([]);
  let [apiError, setapiError] = useState(null);
  let [isLoading, setisLoading] = useState(false)
  let Navigate =useNavigate()
  let [user, setUser] = useState({
    first_name: "",
    last_name: "",
    age: 0,
    email: "",
    password: ""
  })
  function getDataUser(e) {
    console.log(e.target.name);
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser)
  }

  async function register(e) {
    e.preventDefault();
    setisLoading(true);
    if (vaildation()) {
      setisLoading(false);
      setapiError(null);
      Navigate("/home");
//       let { data } = await axios.post(`https://sticky-note-fe.vercel.app/signup`, user);
//       console.log(data);
    
// if(data.message == "success"){
//   setisLoading(false);
// setapiError(null);
// Navigate("/ ");
// }else{
//   setapiError(data.message)
//   setisLoading(false)

// }
  }}

  function vaildation() {
    let schema = Joi.object({
      first_name: Joi.string().required().min(2).max(10),
      last_name: Joi.string().required().min(2).max(10),
      age: Joi.number().required().min(18).max(80),
      email: Joi .string() .email({ minDomainSegments:2, tlds:{ allow: false } }),
      password: Joi .string() .required()
    });
    let res = schema.validate(user, { abortEarly: false });
    console.log(res);

    if(res.error){
      setvalidationError(res.error.details)
      return false
    }else{
      return true
    } 
  };
  return (
      <>
          <div className="container">
          <div className="row">
              <Show/>
            </div>
        <div className="w-75 m-auto py-5">
        <h2>Registeration Form</h2>
          
{apiError && <div className='alert alert-danger'>{apiError}</div>}
          <form onSubmit={(e) => register(e)} >
            <div className="input-data my-2">
              <label htmlFor="first_name">First Name</label>
              <input onChange={(e) => getDataUser(e)}
                type="text"
                className="form-control my-2"
                name="first_name"
              />
            </div>
            <div className={validationError.filter(ele =>ele.context.label=="first_name")[0]?"alert alert-danger" :""}>
            {validationError.filter(ele =>ele.context.label=="first_name")[0]?.message}
            
            </div>  
                      <div className="input-data my-2">
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                className="form-control my-2"
                onChange={(e) => getDataUser(e)}
                name="last_name"
              />
            </div>
            <div className={validationError.filter(ele =>ele.context.label=="last_name")[0]?"alert alert-danger" :""}>
            {validationError.filter(ele =>ele.context.label=="last_name")[0]?.message}
            
            </div>  
            <div className="input-data my-2">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control my-2"
                onChange={(e) => getDataUser(e)}
                name="age"
              />
            </div>
            <div className={validationError.filter(ele =>ele.context.label=="age")[0]?"alert alert-danger" :""}>
            {validationError.filter(ele =>ele.context.label=="age")[0]?.message}
            
            </div>  
            <div className="input-data my-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control my-2"
                onChange={(e) => getDataUser(e)}
                name="email"
              />
            </div>
            <div className={validationError.filter(ele =>ele.context.label=="email")[0]?"alert alert-danger" :""}>
            {validationError.filter(ele =>ele.context.label=="email")[0]?.message}
            
            </div> 
                         <div className="input-data my-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control my-2"
                onChange={(e) => getDataUser(e)}
                name="password"
                autoComplete="current-password"  />
            </div>
            <div className={validationError.filter(ele =>ele.context.label=="password")[0]?"alert alert-danger" :""}>
            {validationError.filter(ele =>ele.context.label=="password")[0]?.message}
            
            </div>  
                        <button className="btn btn-info my-3 float-end">
                          {isLoading?<i className='fa fa-spinner fa-spin'></i>:"sign up"}
                        </button> 
            <div className="clear-fix"></div>
          </form>
          </div>
        </div>
      </>
    )
}
