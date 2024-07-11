import React, { useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";

const SignupUser = ({ addUser }) => {
  const INITIAL_STATE = {
    username: '',
    password: '',
  }
  const [formData, setFormData] = useState(INITIAL_STATE);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(formData => ({
      ...formData,
      [name]: value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.username.trim() !== '' 
    && formData.password.trim() !== ''
    && formData.confirmPassword.trim() !== '' )
    {
        if(formData.password !== formData.confirmPassword)
        {
            alert('Please confirm passwords are the same')
        }
        else{
            addUser({ ...formData });
            setFormData(INITIAL_STATE)
        }
    }
    else{ 
        alert("Something is wrong")
    }
  }

  return (
    <Card>
      <CardBody>
        <CardTitle><h1>Sign up here:</h1></CardTitle>

    <form onSubmit={handleSubmit}>
        <div className="form-group p-2">
            <label htmlFor="username">Username: </label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className='form-control'
            />
        </div>
        
        <div className="form-group p-2">
            <label htmlFor="password">Password: </label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className='form-control'

                />
        </div>

        <div className="form-group p-2">
            <label htmlFor="confirmPassword">Re-enter password: </label>
            <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className='form-control'
                />
        </div>
      

      
      
      <button type='submit' className='btn btn-primary p-2'>Sign up</button>
    </form>
    </CardBody>
    </Card>
  )

}

export default SignupUser;

