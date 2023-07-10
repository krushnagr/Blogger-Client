import React, { useState } from 'react'
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';

const Header = () => {
//   global state
  let isLogin = useSelector((state)=>state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  console.log(isLogin);
  const [value,setValue] = useState();
  const handellogout = () =>{
    try{
        dispatch(authActions.logout());
        toast.success('logout succefully')
        Navigate("/login");
        localStorage.clear();
    }catch(err){
        console.log(err);
    }
  }
  return (
    <>
    <AppBar position='sticky'>
        <Toolbar style={{backgroundColor:'black'}}>
            <Typography variant='h4'>My Blog App</Typography>
            {isLogin && (
                <Box display={"flex"} marginLeft={"auto"} marginRight={"auto"}>
                <Tabs 
                textColor='inherit'value={value}
                onChange={(e,val)=> setValue(val)}>
                    <Tab label = "All Blogs" LinkComponent={Link} to="/blogs"/>
                    <Tab label = "My Blogs" LinkComponent={Link} to="/my-blogs"/>
                    <Tab label = "Create Blogs" LinkComponent={Link} to="/Create-blogs"/>
                </Tabs>
            </Box>
            )}
            <Box display={"flex"} marginLeft={"auto"}>
                {!isLogin && (<>
                <Button sx={{margin:1, color: "white"}}LinkComponent={Link}to="/login">Login</Button>
                <Button sx={{margin:1, color: "white"}}LinkComponent={Link}to="/register">Register</Button>
                </>)}
                {isLogin && (<Button onClick={handellogout} sx={{margin:1, color: "white"}}>LogOut</Button>)}
            </Box>
        </Toolbar>
    </AppBar>
    </>
  )
}

export default Header