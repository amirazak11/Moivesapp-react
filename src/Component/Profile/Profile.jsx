import React from 'react'

export default function Profile({userData}) {

  return (
<>
<div className="container py-3">
  <div className="row ">

  <div className="card  bg-info mb-3">
  <div className="card-header">Account info</div>
  <div className="card-body">
    <h5 className="card-title">Name:</h5><p className='text-secondary' >{userData?.first_name} {userData?.last_name}</p>
    <h5 className="card-title">Email:</h5><p className='text-secondary'>{userData?.email}</p>

  </div>
</div>



    </div>
  </div>

</>
  )
}
