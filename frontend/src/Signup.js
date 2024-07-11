import React, { useState } from "react";

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
    <form onSubmit={handleSubmit}>
        {/* <h1></h1> */}
        <div className="formGroup">
            <label htmlFor="username">Username: </label>
            <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
            />
        </div>
        
        <div className="formGroup">
            <label htmlFor="password">Password: </label>
            <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                />
        </div>

        <div className="formGroup">
            <label htmlFor="confirmPassword">Re-enter password: </label>
            <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                />
        </div>
      

      
      
      <button>Sign up</button>
    </form>
  )

}

export default SignupUser;

