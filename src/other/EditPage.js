import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"


function EditPage(){
  const {id}=useParams();
  const[data, setData]=useState()
  function inputHandler(e){
    setData({...data,[e.target.name]:e.target.value})
  }

  const navigate=useNavigate();

  const getData=async ()=>{
    await axios.get(`http://localhost:3500/user/findUser/${id}`)
    .then(res =>{
      console.log(res.data)
      setData(res.data)
    })
    .catch(err =>{
      "someting error in getting data"
    })
  }

  useEffect(() =>{
    getData();
  },[])

  const updateData=async (e)=>{
    e.preventDefault()
    console.log("in edit user function")
    await axios.put(`http://localhost:3500/user/updateUser/${id}`,data)
    .then(res=>{
      console.log(res);
      alert("profile update successfully")
      navigate("/")
    })
    .catch(err =>{ 
      console.log("something problem in profile update")
      alert("something problem in profile update")
    })
  }

  return(
    <>
    <div className='container'><h1>update profile</h1></div>
    <div className='container'>
    <form onSubmit={updateData}>
    <div className="form-group">
          <label>full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            name="fullName"
            value={data?.fullName} 
            onChange={inputHandler}
            placeholder="Enter your full name"
          />
        </div>
        <div className="form-group">
          <label>Mobile no</label>
          <input
            type="tel"
            className="form-control"
            id="mobile"
            name="mobile"
            value={data?.mobile} 
            onChange={inputHandler}
            placeholder="Enter your mobile no."
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={data?.email} 
            onChange={inputHandler}
            // aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          {/* <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
    </form>
    </div>

    </>
  )
}

export default EditPage;