import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar.js";
import { useNavigate } from "react-router-dom";


function  HomePage() {

    const [user, setUser]=useState([]); 
    const navigate =useNavigate();


    const handleEdit= (id)=> {  
      console.log("in edit user")
      navigate(`/edit/${id}`)
    }

    const handleDelete=id=>{
      console.log("in delete user")
      const deleteConfirmation=window.confirm("are sure want to delete the user")
      if(deleteConfirmation){
        axios.delete(`http://localhost:3500/user/deleteUser/${id}`)
      .then(res =>{
        console.log("user deleted")
        setUser((prevUser) => prevUser.filter((item) => item._id !== id));
        alert("user deleted successfully")
      })
      .catch(err =>{
        alert("something error in deleting user")
        console.log(err);
      })  
      }
    }


    const getAllUsers= async () =>{
        console.log("getting data")
        await axios.get("http://localhost:3500/user/findAll")
        .then(res =>{
            setUser(res.data)
            console.log(res.data)
        })
        .catch(err =>{
            console.log(err);
            alert("somthing error in loading pls wait sometime") 
        })
    }    

    useEffect(()=>{
        getAllUsers()
    },[],handleDelete)
    
    return(
        < >
        
        <Navbar/>
        <div className="container">
        <h1>
            Homepage
        </h1>

        <table id="example" className="table table-striped" style={{ width: "100%" }}>
  <thead>
    <tr>
      <th>Name</th>
      <th>mobile</th>
      <th>email</th>
      <th>action</th>
    </tr>
  </thead>
  <tbody>
   {
     user.map((users) =>(
        <tr>
            <td>{users.fullName}</td>
            <td>{users.mobile}</td>
            <td>{users.email}</td>
            <td>
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => handleEdit(users._id)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(users._id)}
              >
                Delete
              </button>
            </td>
        </tr> 
         
     ))
    }
  </tbody>
  <tfoot>
    <tr>
      <th>Name</th>
      <th>Position</th>
      <th>Office</th>
      <th>Age</th>
      <th>Start date</th>
      <th>Salary</th>
    </tr>
  </tfoot>
</table>
</div>

        </>
    )
}

export default HomePage;