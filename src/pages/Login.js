import React from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const {data} = await axios.post("https://jealous-newt-tank-top.cyclic.app/api/v1/user/login",{
        
        email : input.email,
        password : input.password
      });
      if(data.success){
        localStorage.setItem("userId",data.user._id);
        dispatch(authActions.login());
        toast.success("User login successfully")
        navigate("/")
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
        textAlign={"center"}>Login
        </Typography>
          <TextField value={input.email} onChange={handelChange} placeholder='email' name='email' margin='normal' type='email' required/>
          <TextField value={input.password} onChange={handelChange} placeholder='password' name='password' margin='normal' type='password' required/>
          <Button
          type='submit'
          sx={{borderRadius:3,marginTop:3}}
          color='primary' variant='contained'>Submit</Button>
          <Button onClick={()=>{navigate("/register")}}
          sx={{borderRadius:3,marginTop:3}}>Not A User? Register</Button>
       </Box>
       </form>
    </>
  )
}

export default Login