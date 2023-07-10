import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BlogCart from '../component/BlogCart'

const Userblog = () => {
    const [blogs,setBlogs] = useState([])
    const getUserBlog = async ()=>{
        try{
            const id = localStorage.getItem('userId')
            const {data} = await axios.get(`https://jealous-newt-tank-top.cyclic.app/api/v1/blog/user-blog/${id}`)
            if(data?.success){
                setBlogs(data.userblog.blogs);
                console.log(blogs);
            }
        }catch(error){
            console.log(error);
        }
    }
    // console.log(blogs[blogs.length-1].user);
    useEffect(()=>{
        getUserBlog();
    },[])
  return (
    <div>
      {blogs && blogs.length>0?
        blogs.map((blog) => (
          <BlogCart
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user}
            title={blog?.title}
            description={blog?.descripation}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        )):(<h1 style={{textAlign:'center',paddingTop:'30px'}}>You haven't Published any blogs</h1>)}
    </div>
  )
}

export default Userblog