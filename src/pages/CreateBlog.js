import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CreateBlog = () => {
    const Navigate = useNavigate();
    const [input, setinput] = useState({
        title: "",
        description: "",
        image: "",
      });
      const id = localStorage.getItem("userId");
     const handleSubmit =  async(e)=>{
        e.preventDefault();
        try{
            console.log(input);
            const {data} = await axios.post('https://jealous-newt-tank-top.cyclic.app/api/v1/blog/create-blog',{
                title : input.title,
                descripation : input.description,
                image : input.image,
                user : id
        })
        if(data?.success){
            toast.success("Blog is Created");
            Navigate('/my-blogs');
        }else{
            alert("Please fill all fields");
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
  return (
    <div >
        <form onSubmit={handleSubmit}>
            <Box style={{marginTop:'40px'}} border={3} borderRadius={10} padding={3} margin = 'auto' width={'60%'}
            boxShadow={"10px 10px 20px #ccc"} textAlign={'center'} display={'flex'} flexDirection={'column'}>
                <Typography variant='h3' textAlign={'center'} fontWeight={"bold"}
                padding={3}>Create A Blog</Typography>

                <InputLabel sx={{mb: 1, mt:2,fontSize:"24px",fontWeight:"bold"}}>Title</InputLabel>
                <TextField name='title' value={input.title} onChange={handelChange} margin='normal' variant='outlined'/>

                <InputLabel sx={{mb: 1, mt:2,fontSize:"24px",fontWeight:"bold"}}>Describation</InputLabel>
                <TextField name='description' value={input.description} onChange={handelChange} margin='normal' variant='outlined'/>

                <InputLabel sx={{mb: 1, mt:2,fontSize:"24px",fontWeight:"bold"}}>Image</InputLabel>
                <TextField name='image' value={input.image} onChange={handelChange} margin='normal' variant='outlined'/>

                <Button type='submit' color="primary" variant="contained">Submit</Button>
            </Box>
        </form>
    </div>
  )
}

export default CreateBlog