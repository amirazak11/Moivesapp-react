import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import Show from '../Show/Show';
export default function Login({saveUser}) {
  
    let [user, setUser] = useState({
      email: "",
      password: ""
    })
  let [validationError, setvalidationError] = useState([]);
  let [apiError, setapiError] = useState(null);
  let [isLoading, setisLoading] = useState(false)
  let navigate =useNavigate()
  function getDataUser(e) {
    console.log(e.target.name);
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser)
  }
  async function loginUser(e) {
    e.preventDefault();   
       setisLoading(true)
    if (vaildation()) {
      setisLoading(false);
      setapiError(null);
      navigate("/home");
//       let { data } = await axios.post(   
//      "https://sticky-note-fe.vercel.app/signin",
//       user);
// if(data.message == "success"){
//   // setisLoading(false);
//   // navigate("/home");
//     localStorage.setItem("token",data.token);
//     saveUser();
//   setisLoading(false);
// setapiError(null);
// }else{
//   setapiError(data.message)
//   setisLoading(false)

// }
  }}

  function vaildation() {
    let schema = Joi.object({
      email: Joi .string() .email({ minDomainSegments:2, tlds:{ allow: false } }),
      password: Joi
        .string()
        .required()
    
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
<div className="row">
       

     <div className="w-75 m-auto py-5">

{apiError && <div className='alert alert-danger'>{apiError}</div>}
<h2 className='text-type'>login Form</h2>
<form onSubmit={(e) => loginUser(e)}>
              <div className="input-data my-2">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`form-control my-2 ${validationError.filter((ele) => ele.context.label === 'email')[0]
                    ? 'is-invalid'
                    : ''}`}
                  onChange={(e) => getDataUser(e)}
                  name="email"
                />
                <div className="invalid-feedback">
                  {validationError.filter((ele) => ele.context.label === 'email')[0]?.message}
                </div>
              </div>
              <div className="input-data my-2">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`form-control my-2 ${validationError.filter((ele) => ele.context.label === 'password')[0]
                    ? 'is-invalid'
                    : ''}`}
                  onChange={(e) => getDataUser(e)}
                  name="password"
                  autoComplete="current-password"
                />
                <div className="invalid-feedback">
                  {validationError.filter((ele) => ele.context.label === 'password')[0]?.message}
                </div>
              </div>
              <button className="btn btn-info my-3 float-end" disabled={isLoading}>
                {isLoading ? <i className="fa fa-spinner fa-spin"></i> : 'Login'}
              </button>
            </form>
          </div></div>
      
          </div>
   
      </>
    )
}
