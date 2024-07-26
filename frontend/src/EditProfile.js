import React, { useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import JoblyApi from "./api";

import { useNavigate } from "react-router-dom";

const EditUser = ({ editUser, currentUser,token}) => {

  const params = useParams()
  const [isLoaded, setIsLoaded] = useState(false)
  const [userData, setUserData] = useState(null)

  const navigate = useNavigate();

  useEffect( () => {
        async function getProfile(){
            const resp = await JoblyApi.getUser(currentUser, token)
            setUserData(resp)
        }
        getProfile()
        setIsLoaded(true)
        }
    , [isLoaded])


  const INITIAL_STATE = {
    firstname: userData?.user.firstname || '',
    lastname: userData?.user.lastname || '',
    email: userData?.user.email || ''
  };

  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (
      formData.firstname.trim() === '' ||
      formData.lastname.trim() === '' ||
      formData.email.trim() === ''
    ) {
      alert("Please fill out all fields");
      return;
    } 

    if(formData.password !== formData.confirmPassword){
      alert('Passwords do not match')
      return;
    }
  
    try {
      // console.log(params)
      await editUser(formData, params.username);
      setFormData(INITIAL_STATE); // Clear form after successful submission
      alert(`Successfully changed profile for ${params.username}`)
      // window.location.href = '/'
      navigate('/')
      
    } catch (error) {
      console.error("Error editing user:", error);
      // Handle error appropriately (e.g., show error message)
      alert("Failed to edit user");
    }
  };

  return (
    <Card>
      <CardBody>
        <CardTitle><h1>Change profile:</h1></CardTitle>

        <form onSubmit={handleSubmit}>
          <div className="form-group p-2">
            <label htmlFor="firstname">First name: </label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              placeholder="Enter first name"
              value={formData.firstname}
              onChange={handleChange}
              className='form-control'
            />
          </div>

          <div className="form-group p-2">
            <label htmlFor="lastname">Last name: </label>
            <input
              id="lastName"
              type="text"
              name="lastname" 
              placeholder="Enter last name"
              value={formData.lastname}
              onChange={handleChange}
              className='form-control'
            />
          </div>

          <div className="form-group p-2">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className='form-control'
            />
          </div>

          <button type='submit' className='btn btn-primary p-2'>Confirm changes</button>
        </form>
      </CardBody>
    </Card>
  );
};

export default EditUser;
