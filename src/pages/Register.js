import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  // state
  const [input,setinput] = useState({
    name : "",
    email : "",
    password: ""
  })
  const handelChange = (e)=>{
    setinput((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  }
  const handelSbmit = async (e)=>{
    e.preventDefault();
    try{
      const {data} = await axios.post("http://localhost:8000/api/v1/user/signup",{
        username : input.name,
        email : input.email,
        password : input.password
      });
      if(data.success){
        alert("User add successfully")
        navigate("/login")
      }
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <>
    <form onSubmit={handelSbmit}>
       <Box 
        maxWidth={450}
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
        margin={"auto"}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
       >
        <Typography sx={{textTransform:"uppercase"}} variant='h4'
        padding={3}
        textAlign={"center"}>Register
        </Typography>
          <TextField value={input.name} onChange={handelChange}placeholder='name' name='name' margin='normal' type='text' required/>
          <TextField value={input.email} onChange={handelChange} placeholder='email' name='email' margin='normal' type='email' required/>
          <TextField value={input.password} onChange={handelChange} placeholder='password' name='password' margin='normal' type='password' required/>
          <Button
          type='submit'
          sx={{borderRadius:3,marginTop:3}}
          color='primary' variant='contained'>Submit</Button>
          <Button onClick={()=>{navigate("/login")}}
          sx={{borderRadius:3,marginTop:3}}>Already Registed? Login</Button>
       </Box>
       </form>
    </>
  )
}

export default Register