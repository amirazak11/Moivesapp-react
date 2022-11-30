import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
import Show from '../Show/Show';
export default function Login({saveUser}) {
    console.log({saveUser});
    let [user, setUser] = useState({
      email: "",
      password: ""
    })
  let [validationError, setvalidationError] = useState([]);
  let [apiError, setapiError] = useState(null);
  let [isLoading, setisLoading] = useState(false)
  let Navigate =useNavigate()
  function getDataUser(e) {
    console.log(e.target.name);
    let currentUser = { ...user };
    currentUser[e.target.name] = e.target.value;
    setUser(currentUser)
  }
  async function loginUser(e) {
    e.preventDefault();
    if (vaildation()) {
      setisLoading(true)
      let { data } = await axios.post(   
     "https://routeegypt.herokuapp.com/signin",
      user);
if(data.message == "success"){
    localStorage.setItem("token",data.token);
    saveUser();
    Navigate("/home")
  setisLoading(false);
setapiError(null);
}else{
  setapiError(data.message)
  setisLoading(false)

}
  }}
  // function vaildation(){
  //   let SignupSchema = Yup.object().shape({
  //     first_name: Yup.string()
  //       .min(2, 'Too Short!')
  //       .max(50, 'Too Long!')
  //       .required('Required'),
  //     last_name: Yup.string()
  //       .min(2, 'Too Short!')
  //       .max(50, 'Too Long!')
  //       .required('Required'),
  //     email: Yup.string().email('Invalid email').required('Required'),
  //     ag: Yup.number.positive().integer().required('Required'),
  //     password: Yup.string().patern(new RegExp(/^[A-Z][a-z{3,8}]$/)).required('Required')
  //   });
  //   let res = SignupSchema.validate(user)
  //   console.log(res);
  // }
  function vaildation() {
    let schema = Joi.object({
      email: Joi .string() .email({ minDomainSegments:2, tlds:{ allow: false } }),
      password: Joi
        .string()
        .required()
        .pattern(new RegExp(/^[a-z][0-9]/)),
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
          <form onSubmit={(e) => loginUser(e)} >
         
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
            
            </div>              <div className="input-data my-2">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control my-2"
                onChange={(e) => getDataUser(e)}
                name="password"
              />
            </div>
            <div className={validationError.filter(ele =>ele.context.label=="password")[0]?"alert alert-danger" :""}>
            {validationError.filter(ele =>ele.context.label=="password")[0]?.message}
            
            </div>  
                        <button className="btn btn-info my-3 float-end">
                          {isLoading?<i className='fa fa-spinner fa-spin'></i>:"Login"}
                        </button>
          </form>
          </div></div>
      
          </div>
   
      </>
    )
}
