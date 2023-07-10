import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import toast from 'react-hot-toast';

const BlogDetails = () => {
    const [blog, setBlog] = useState({});
    const [input, setinput] = useState({});
    const id = useParams().id;
    const uid = localStorage.getItem("userId");
    const navigate = useNavigate();
    const getBlogDetails = async() =>{
        try{
            const {data} = await axios.get(`https://jealous-newt-tank-top.cyclic.app/api/v1/blog/get-blog/${id}`);
            if (data?.success) {
                setBlog(data?.blog);
                console.log(data.blog);
                setinput({
                    title: data?.blog.title,
                    descripation: data?.blog.descripation,
                    image: data?.blog.image,
                  });
            }
    }catch (error) {
        console.log(error);
      }
    }
    useEffect(() => {
        getBlogDetails();
      }, [id]);
    const handleSubmit =  async(e)=>{
        e.preventDefault();
        try{
            // console.log(input);
            const { data } = await axios.put(`/api/v1/blog/update-blog/${id}`, {
                title : input.title,
                descripation : input.description,
                image : input.image,
                user : uid
              });
              if (data?.success) {
                toast.success("Blog Updated");
                navigate("/my-blogs");
              }
    }
        catch(err){
            console.log(err);
        }
     }
     const handelChange = (e)=>{
        setinput((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
          }))
     }
      
    //   console.log(blog);
  return (
    <div >
        <form onSubmit={handleSubmit}>
            <Box style={{marginTop:'40px'}} border={3} borderRadius={10} padding={3} margin = 'auto' width={'60%'}
            boxShadow={"10px 10px 20px #ccc"} textAlign={'center'} display={'flex'} flexDirection={'column'}>
                <Typography variant='h3' textAlign={'center'} fontWeight={"bold"}
                padding={3}>update A Blog</Typography>

                <InputLabel sx={{mb: 1, mt:2,fontSize:"24px",fontWeight:"bold"}}>Title</InputLabel>
                <TextField name='title' value={input.title} onChange={handelChange} margin='normal' variant='outlined'/>

                <InputLabel sx={{mb: 1, mt:2,fontSize:"24px",fontWeight:"bold"}}>Describation</InputLabel>
                <TextField name='descripation' value={input.descripation} onChange={handelChange} margin='normal' variant='outlined'/>

                <InputLabel sx={{mb: 1, mt:2,fontSize:"24px",fontWeight:"bold"}}>Image</InputLabel>
                <TextField name='image' value={input.image} onChange={handelChange} margin='normal' variant='outlined'/>

                <Button type='submit' color="warning" variant="contained">Update</Button>
            </Box>
        </form>
    </div>
  )
}

export default BlogDetails