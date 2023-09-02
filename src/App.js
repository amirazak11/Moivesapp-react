import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import Mainlayout from "./Component/Mainlayout/Mainlayout";
import Moives from "./Component/Moives/Moives";
import Home from "./Component/Home/Home";
import Register from "./Component/Register/Register";
import Login from "./Component/Login/Login";
import Details from "./Component/Details/Details";
import TvShows from "./Component/ShowsOftv/TvShows";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Show from "./Component/Show/Show";
import Profile from "./Component/Profile/Profile";
function App() {
  let[userData,setuserData]=useState(null);
  useEffect(()=>{
    if(localStorage.getItem("token")){
      saveUser();
    }
  },[])

  function saveUser(){
    let token =localStorage.getItem("token")
    let decoded = jwt_decode(token);
    setuserData(decoded)
  } 
  function ProtectedRoute(props){
    if(localStorage.getItem("token")){
      return props.children 
    }else{
return <Navigate to="/" />
    }
  }
  function logOut(){
    localStorage.removeItem("token");
    setuserData(null);
return <Navigate to="/" />
  }
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Mainlayout userData={userData} logOut={logOut}/>,
      children: [
        { path: "home", element:<ProtectedRoute> <Home/></ProtectedRoute>  },
        { index: true , element: <Login saveUser={saveUser}/> }, 
        { path: "movies", element: 
        <ProtectedRoute> 
          <Moives/>
          </ProtectedRoute>},
        { path: "register", element: <Register/>   },
        { path: "tvshow", element: <ProtectedRoute><TvShows/></ProtectedRoute>  },
        // { path: "profile", element:<Profile userData={userData} />},
        { path: "profile", element: <ProtectedRoute><Profile userData={userData}/></ProtectedRoute>  },
        { path: "details/:id/:type", element: <ProtectedRoute> <Details/></ProtectedRoute>  },
        {path:"show",element: <ProtectedRoute> <Show/></ProtectedRoute>  }
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
